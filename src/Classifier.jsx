import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

const CHAMETZ = [
  "bagel, beigel",
  "French loaf",
  "toaster",
  "dough",
  "bakery, bakeshop, bakehouse",
  "pretzel",
  "cheeseburger",
  "hotdog, hot dog, red hot",
  "burrito",
  "pizza, pizza pie",
  "potpie",
];

export const loadModel = async () => {
  return await mobilenet.load();
};

export const getPredictions = async (webcam, net) => {
  try {
    const img = await webcam.capture();
    const result = await net.classify(img);
    console.log("predicting");
    console.log(img);
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
    console.log("result");
    console.log(result);
    return result;
  } catch {
    return [];
  }
};

const PredictionsTexts = styled.div`
  display: flex;
  justify-content: center;
  /* border: 2px solid #0fdfee; */
  width: 10em;
  height: 1.5em;
  margin: 0.75em;
`;

export const Predictions = (props) => {
  const chametz = props.predictions.filter((val) => {
    return val["probability"] > 0.1 && CHAMETZ.includes(val["className"]);
  });

  console.log(chametz);

  const result = chametz.length ? "Not Kosher!! 👿" : "";

  return <PredictionsTexts>{result}</PredictionsTexts>;
};
