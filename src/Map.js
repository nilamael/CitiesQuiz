import React, { useMemo, useState } from 'react'
import { Circle, GoogleMap, Marker } from '@react-google-maps/api'
import { RxSewingPin } from 'react-icons/rx'
import './Map.css'

function Map({setCitiesPlaced, citiesPlaced, cityToGuess, setKilometersLeft, kilometersLeft, setMarkerWasSet, markerWasSet, gameStarted, setLatLng, latLng, gameFinished, setDistanceFeedback}) {

    const center = useMemo(() => ({ lat: 55, lng: 19 }), [])
    
    function getDistanceInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius der Erde in Kilometern
      const dLat = deg2rad(lat2-lat1);
      const dLon = deg2rad(lon2-lon1);
      const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Entfernung in Kilometern
    
      return Math.floor(distance);
    }
    
    function deg2rad(deg) {
      return deg * (Math.PI/180);
    }
    
    const clickHandler = (e) => {
      if (!gameStarted || gameFinished) {return}
  

      setLatLng(e.latLng)
      const distance = getDistanceInKm(cityToGuess.lat, cityToGuess.lng, e.latLng.lat(), e.latLng.lng())
      if (distance <= 50) {
        setDistanceFeedback(`Correct!`)
      
      } 
      else {
        setKilometersLeft(kilometersLeft -= distance - 50)
        setDistanceFeedback(`You missed ${cityToGuess.name} by ${distance - 50} km.`)
      }

      setCitiesPlaced(citiesPlaced += 1)
      setMarkerWasSet(true) 
    }


    return (
    <>
      <GoogleMap 
        zoom={3.5} 
        center={center} 
        mapContainerClassName="map-container"
        onClick={clickHandler}

        options={{mapId: '61853d2b0a919f9c', mapTypeControl: false, minZoom: 3, maxZoom: 6, streetViewControl: false}}
      >
        <Marker position={latLng} />
        {markerWasSet && 
          <Circle 
          center={{lat: parseFloat(cityToGuess.lat), lng: parseFloat(cityToGuess.lng)}}
          radius={50000}
          ></Circle>
        }



      </GoogleMap>
    </>
    )
}

export default Map