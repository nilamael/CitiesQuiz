import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Map from './Map'
import Score from './Score'
import { useLoadScript } from '@react-google-maps/api'
import citiesJSON from './cities.json'

// TODO: Key verschlüsseln

function App() {

  const [citiesPlaced, setCitiesPlaced] = useState(0)
  const [cityToGuess, setCityToGuess] = useState('')
  const [latLng, setLatLng] = useState(null)
  const [updatedCapitalCities, setUpdatedCapitalCities] = useState([])
  const [generatedNumbers, setGeneratedNumbers] = useState([])
  const [gameFinished, setGameFinished] = useState(false)
  const [kilometersLeft, setKilometersLeft] = useState(1500)
  const [gameLost, setGameLost] = useState(false)
  const [markerWasSet, setMarkerWasSet] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [distanceFeedback, setDistanceFeedback] = useState('')


  useEffect(() => {
    if (kilometersLeft <= 0) {
      setKilometersLeft(0)
      setGameLost(true)
      setGameFinished(true)
      setGameStarted(false)
    }
  }, [kilometersLeft])


  function removeDuplicateCities(cities) {
    const uniqueCities = cities.filter((city, index) => {
      const _city = JSON.stringify(city)
      return index === cities.findIndex(obj => {
        return JSON.stringify(obj) === _city
      })
    })
    return uniqueCities
  }


  async function fetchData() {
    const uniqueCities = removeDuplicateCities(citiesJSON.capitalCities)
    try {
      const updatedCities = await Promise.all(uniqueCities.map(async(city) => {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city.capitalCity}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
        const location = response.data.results[0].geometry.location
        return {name: city.capitalCity, lat: location.lat, lng: location.lng} 
      }))
      setUpdatedCapitalCities(updatedCities)
    } catch (error) {
      alert("Something went wrong")
    }
  }

  useEffect(() => {
    if (citiesPlaced === updatedCapitalCities.length && updatedCapitalCities.length !== 0) {
      setGameFinished(true)
    }
  }, [citiesPlaced])
  

  useEffect(() => {
    fetchData()
  }, [])

  const startHandler = () => {
    nextCityHandler()
    setGameStarted(true)
    setLatLng(null)
  }

  
  const nextCityHandler = () => {
    const randomIndex = Math.floor(Math.random() * updatedCapitalCities.length)
    if (updatedCapitalCities.length === generatedNumbers.length) {
      setGameFinished(true)
    } else if (!generatedNumbers.includes(randomIndex)) {
      setGeneratedNumbers([...generatedNumbers, randomIndex])
      setCityToGuess(updatedCapitalCities[randomIndex])
    } else {
      nextCityHandler()
    }
    setMarkerWasSet(false)
    setLatLng(null)
  }
  
  const resetHandler = () => {
    setGameFinished(false)
    setGeneratedNumbers([])
    setCitiesPlaced(0)
    setKilometersLeft(1500)
    setGameLost(false)
    setGameStarted(false)
    setLatLng(null)
    setMarkerWasSet(false)
    setDistanceFeedback('')
    
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    mapIds: ['61853d2b0a919f9c']
  })

  return (
    <div className="App">
      <Score 
        citiesPlaced={citiesPlaced} 
        cityToGuess={cityToGuess} 
        kilometersLeft={kilometersLeft}
        gameStarted={gameStarted}
        distanceFeedback={distanceFeedback}
        markerWasSet={markerWasSet}
        gameLost={gameLost}
      />
      
      <div className='buttonGroup'>
        {gameFinished ? <button className='button' onClick={resetHandler}>Reset</button> 
        : !gameStarted ? <button className='button' onClick={startHandler}>Start</button> 
        : markerWasSet ? <button  className='button' onClick={nextCityHandler}>Next city</button> : 
        <p className='setMarker'>Set marker</p>}

        {gameFinished ? gameLost ? <p className='lostMessage'>You lost!</p> : <p className='winMessage'>You won!</p> : <p></p>}
      </div>
      
      {!isLoaded ? <div>Loading...</div> : 
        <Map 
          citiesPlaced={citiesPlaced} 
          setCitiesPlaced={setCitiesPlaced} 
          cityToGuess={cityToGuess} 
          setKilometersLeft={setKilometersLeft} 
          kilometersLeft={kilometersLeft}
          setMarkerWasSet={setMarkerWasSet}
          markerWasSet={markerWasSet}
          gameStarted={gameStarted}
          gameFinished={gameFinished}
          setLatLng={setLatLng}
          latLng={latLng}
          setDistanceFeedback={setDistanceFeedback}
        />
      }
    </div>
  )
}

export default App
