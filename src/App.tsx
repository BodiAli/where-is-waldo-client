import whereIsWaldo from "./assets/images/where-is-waldo.jpeg";
import "./App.css";
import type { MouseEvent } from "react";
import getImageCoordinates from "./utils/getImageCoordinates";

const WALDO = { xStart: 856, xEnd: 912, yStart: 922, yEnd: 1028 };
const WENDA = { xStart: 875, xEnd: 901, yStart: 741, yEnd: 792 };
const WIZARD = { xStart: 1325, xEnd: 1374, yStart: 964, yEnd: 997 };

export default function App() {
  function handleClick(e: MouseEvent<HTMLImageElement>) {
    const { imgX, imgY } = getImageCoordinates(e);

    console.log(imgX, imgY);
  }
  return (
    <>
      <h1>Hello, World!</h1>
      <div className="image container">
        <img style={{ width: "100%" }} src={whereIsWaldo} alt="waldo" onClick={handleClick} />
      </div>
    </>
  );
}
