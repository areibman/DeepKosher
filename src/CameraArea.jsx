import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";

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

// const useUserMedia = (requestedMedia) => {
//   const [mediaStream, setMediaStream] = useState(null);

//   useEffect(() => {
//     async function enableStream() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia(
//           requestedMedia
//         );
//         setMediaStream(stream);
//       } catch (err) {
//         // Removed for brevity
//       }
//     }

//     if (!mediaStream) {
//       enableStream();
//     } else {
//       return function cleanup() {
//         mediaStream.getTracks().forEach((track) => {
//           track.stop();
//         });
//       };
//     }
//   }, [mediaStream, requestedMedia]);

//   return mediaStream;
// };

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
    setMediaStream(props.stream);
    videoRef.current.srcObject = mediaStream;
  }, [props, videoRef, mediaStream]);

  return (
    <CameraFrame>
      <CameraWindow
        ref={videoRef}
        autoPlay
        playsInline
        onCanPlay={handleCanPlay}
      ></CameraWindow>
    </CameraFrame>
  );
};

export default CameraArea;
