import { useState } from 'react'
import './App.css'
import FaceRecognition from './Component/FaceRecognition/FaceRecognition'
import SongContainer from './Component/SongContainer/SongContainer'

const App = () => {
  const [Songs, setSongs] = useState(
          []
      )
  return (
    <>
    <FaceRecognition setSongs={setSongs}/>
    <SongContainer Songs ={Songs}/>
    </>
    
  )
}

export default App
