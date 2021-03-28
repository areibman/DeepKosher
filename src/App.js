import styled from "styled-components";
import React, { useEffect } from "react";
import { loadModel, Predictions } from "./Classifier";
import CameraArea from "./CameraArea";
import "./App.css";

const Subtext = styled.p`
  height: 2em;
`;

const App = () => {
  const [cameraEnabled, setCameraEnabled] = React.useState(false);
  // const [cameraPermissionsGranted, setCameraPerms] = React.useState(false)
  const [stream, setStream] = React.useState(null);

  const activateCamera = async (e) => {
    if (!!!stream) {
      console.log("Enabling");
      await enableCam({
        audio: false,
        video: { facingMode: "environment" },
      });
      console.log("awaited");
      // setCameraPerms(true)
      // setCameraEnabled(true)
    } else {
      console.log("disablin");
      disableCam();
      // setCameraPerms(false)
      // setCameraEnabled(false)
    }
  };

  // useEffect(() => {
  //   console.log('sidefeevt')
  //   const streamExists = !!stream
  //   setCameraPerms(streamExists)
  //   setCameraEnabled(streamExists)

  // }, [stream])

  const enableCam = async (constraints) => {
    // video: true

    try {
      setStream(await navigator.mediaDevices.getUserMedia(constraints));
      // setCameraPerms(true)
      setCameraEnabled(true);
    } catch (err) {
      /* handle the error */
      // setCameraPerms(false)
      setCameraEnabled(false);
      setStream(null);
    }
  };

  const disableCam = () => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setStream(null);
    // setCameraPerms(false)
    setCameraEnabled(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <CameraArea stream={stream} />
        {cameraEnabled || (
          <Subtext>Please enable permissions to use your camera</Subtext>
        )}
        <button onClick={activateCamera}>Activate Camera</button>
        <Predictions predictions={"Hello"} />
      </header>
    </div>
  );
};

export default App;
