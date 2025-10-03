import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import "../../src/index.css";
import MoodSongs from "./MoodSongs";

export default function FaceExpressionDetector() {
  const [songs, setSongs] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        // Load face-api models (must be inside /public/models/)
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");

        // Start webcam stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error starting video:", err);
      }
    };

    startVideo();
  }, []);

  const detectExpression = async () => {
    if (!videoRef.current) return;

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;

        // Find best expression
        const bestExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        // Fetch songs based on mood
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/songs?mood=${bestExpression}`
        );

        if (response.data?.songs && Array.isArray(response.data.songs)) {
          setSongs(response.data.songs);
        } else {
          setSongs([]);
        }
      } else {
        console.log("No face detected.");
        setSongs([]);
      }
    } catch (error) {
      console.error(
        "Error detecting expression or fetching songs:",
        error.message
      );
      setSongs([]);
    }
  };

  return (
    <div className="videoContainer">
      <video ref={videoRef} autoPlay muted crossOrigin="anonymous" />
      <div className="getSongs">
        <button onClick={detectExpression}>Detect Expression</button>
        <MoodSongs songs={songs} />
      </div>
    </div>
  );
}
