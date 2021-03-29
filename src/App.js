import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadModel, getPredictions, Predictions } from "./Classifier";
import CameraArea from "./CameraArea";
import "./App.css";
import { model } from "@tensorflow/tfjs";

const Subtext = styled.p`
  height: 0.5em;
`;

const Button = styled.button`
  outline: 0;
  font-size: 1em;
  font-weight: 600;
  background: #fff;
  border: none;
  padding: 1em;
  transition: all 0.3s ease-out;
  box-shadow: inset 0 -8px 0 0 rgba(0, 0, 0, 0.2), 1px 1px 0 0 #d98e20,
    2px 2px 0 0 #d98e20, 3px 3px 0 0 #d98e20, 4px 4px 0 0 #d98e20,
    5px 5px 0 0 #d98e20, 6px 6px 0 0 #d98e20, 7px 7px 0 0 #d98e20,
    8px 8px 0 0 #d98e20, 9px 9px 0 0 #d98e20, 10px 10px 0 0 #d98e20,
    11px 11px 0 0 #d98e20, 12px 12px 0 0 #d98e20;

  :hover {
    color: #444;
  }
  :active {
    color: #222;
    box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.2), 1px 1px 0 0 #d98e20,
      2px 2px 0 0 #d98e20, 3px 3px 0 0 #d98e20, 4px 4px 0 0 #d98e20,
      5px 5px 0 0 #d98e20;
  }
`;

const useInterval = async (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const App = () => {
  const [cameraEnabled, setCameraEnabled] = React.useState(false);
  const [stream, setStream] = React.useState(null);
  const [videoElement, setVideoElement] = React.useState(null);
  const [webcam, setWebcam] = React.useState(null);
  const [model, setModel] = React.useState();
  const [modelLoaded, setModelLoaded] = React.useState(false);
  const [predictions, setPrediction] = React.useState([]);

  loadModel().then((m) => {
    setModel(m);
  });

  const activateCamera = async (e) => {
    if (!!!stream) {
      await enableCam({
        audio: false,
        video: { facingMode: "environment" },
      });
    } else {
      disableCam();
    }
  };

  const enableCam = async (constraints) => {
    // video: true
    try {
      setStream(await navigator.mediaDevices.getUserMedia(constraints));
      setCameraEnabled(true);
      tf.data.webcam(videoElement).then((s) => {
        setWebcam(s);
      });
    } catch (err) {
      /* handle the error */
      setCameraEnabled(false);
      setStream(null);
      setWebcam(null);
    }
  };

  const disableCam = () => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setCameraEnabled(false);
    setStream(null);
    setWebcam(null);
  };

  useEffect(() => {
    if (!!!videoElement) {
      setVideoElement(document.getElementById("webcam"));
    }
  }, [videoElement]);

  useEffect(() => {
    if (!!model) {
      setModelLoaded(true);
    }
  }, [model, modelLoaded]);

  useInterval(async () => {
    // Your custom logic here

    if (modelLoaded && videoElement && cameraEnabled) {
      setPrediction(await getPredictions(webcam, model));
    }
    // setPrediction(prediction + 1);
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <Subtext>
          {modelLoaded ? "Model is ready" : "Model is loading..."}
        </Subtext>
        {cameraEnabled ? (
          <Subtext />
        ) : (
          <Subtext>Please enable permissions to use your camera</Subtext>
        )}
        <CameraArea stream={stream} />
        {predictions ? (
          <Predictions predictions={predictions} />
        ) : (
          <div> "Waiting..."</div>
        )}
        <Button onClick={activateCamera}>
          {cameraEnabled ? "Close" : "Activate"} Camera
        </Button>
      </header>
    </div>
  );
};

export default App;
