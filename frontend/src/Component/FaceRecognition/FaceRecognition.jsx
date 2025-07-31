import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceRecognition.css'; // Import the styles
import axios from 'axios'

export default function FacialExpression({setSongs}) {
  const videoRef = useRef();//some thing will get store into it

 const loadModels = async () => {
      const MODEL_URL = '/Models'; // Match folder name// models folder ka path de diya , model folder se models load honge aur store hoge in MODEL_URL
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {// video ko start karne ke liye use kiya
      navigator.mediaDevices.getUserMedia({ video: true })// it return promise hence use  // these from web api , navigator.mediaDevices.getUserMedia( { video: true } ), video ko access karne ke liye use kiya
        .then((stream) => {
          videoRef.current.srcObject = stream;         
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectface(){
      const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();// detect faces and expressions
          let mostProbaleExpression = 0; // Default expression
          let _expressions = '';
          if(!detections || detections.length === 0) {
            console.log("No faces detected");
            return;

          }
          for (const expressions of Object.keys(detections[0].expressions)) {
            if( detections[0].expressions[expressions]>mostProbaleExpression){
              mostProbaleExpression = detections[0].expressions[expressions];
              _expressions = expressions;
            }
          }
          
          axios.get(`http://localhost:3000/songs?mood=${_expressions}`)
          .then((response) => {
            setSongs(response.data.Songs);
          })
    }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <>
    <div className="face-recognition-container">
      <video
        ref={videoRef}
        autoPlay
        muted
       className='video-element'
      />
      <div className="sideContainer">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quaerat laborum distinctio?Lorem ipsum dolor sit amet consectetur. click and search your favraite song as per mood just one click </p>
        <button className='play-btn'onClick={detectface} > start Detect </button>
      </div>
    </div>
    </>
    
  );
}
