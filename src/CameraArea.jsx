import styled from "styled-components";
import React, { useRef, useState, useEffect, useMemo } from "react";

const CameraFrame = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  height: auto;
  width: 100%;
`;

// const memoizedSetMediaStream = useMemo(setMediaStream(props.stream), props.stream)

const CameraWindow = styled.video`
  border: 2px solid papayawhip;
  height: 15em;
  width: 15em;
`;

const CameraArea = (props) => {
  const videoRef = useRef();
  const [mediaStream, setMediaStream] = useState(null);

  const handleCanPlay = () => {
    console.log("HandleCanplay");
    videoRef.current.play();
  };

  useEffect(() => {
    console.log("videoref render");
    videoRef.current.srcObject = mediaStream;
  }, [videoRef, mediaStream]);

  useEffect(() => {
    console.log(props.stream);
    setMediaStream(props.stream);
  }, [props]);

  return (
    <CameraFrame>
      <CameraWindow
        id="webcam"
        ref={videoRef}
        autoPlay
        playsInline
        onCanPlay={handleCanPlay}
      ></CameraWindow>
    </CameraFrame>
  );
};

export default CameraArea;
