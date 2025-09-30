import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      // Load models (must be inside public/models/)
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");

      // Start webcam
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    startVideo();
  }, []);

  const detectExpression = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;

      const maxValue = Math.max(...Object.values(expressions));
      const bestExpression = Object.keys(expressions).find(
        (key) => expressions[key] === maxValue
      );

      console.log("Detected Expression:", bestExpression, expressions[bestExpression]);
    } else {
      console.log("Detected Expression:", null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      />
      <button
        onClick={detectExpression}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Detect Expression
      </button>
    </div>
  );
}
