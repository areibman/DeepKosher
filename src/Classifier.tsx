import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
  return await mobilenet.load();
};

const PredictionsTexts = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid #0fdfee;
  width: 10em;
`;

const getPredictions = async (webcamElement: HTMLVideoElement, net: mobilenet.MobileNet) => {
  const webcam = await tf.data.webcam(webcamElement);
    const img = await webcam.capture();
    const result = await net.classify(img);

    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
    return result
  
};

export const Predictions = (props) => {
  return <PredictionsTexts>{props.predictions}</PredictionsTexts>;
};
