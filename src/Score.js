import React, {useState} from 'react'
import './Score.css'

function Score({citiesPlaced, cityToGuess, kilometersLeft, gameStarted, distanceFeedback, markerWasSet, gameLost}) {

 

  return (
    <>
    <div className='scoreContainer'>
      <div className='scoreDisplay'>{citiesPlaced} cities placed</div>
      <div className='scoreDisplay'>{kilometersLeft} kilometers left</div>
    </div>
    <div className='scoreContainer'>
      {gameStarted || gameLost ? <p className='scoreCityToGues'>{cityToGuess.name}</p>: <p></p>}
      {markerWasSet && <p className='scoreFeedback'>{distanceFeedback}</p>}
    </div>
    </>
  )
}

export default Score