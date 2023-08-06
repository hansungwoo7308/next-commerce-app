import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
export default function Slider() {
  const [direction, setDirection]: any = useState();
  const carousel: any = useRef();
  const slider: any = useRef();
  const setSliderDirection = () => {
    if (direction === -1) {
      slider.current.append(slider.current.firstElementChild);
    }
    if (direction === 1) {
      slider.current.prepend(slider.current.lastElementChild);
    }
  };
  const setSliderPosition = () => {
    slider.current.style.transition = `none`;
    slider.current.style.transform = `translate(0)`;
    setTimeout(() => {
      slider.current.style.transition = `all 0.5s`;
    });
  };
  const handleTransitionEnd = () => {
    setSliderDirection();
    setSliderPosition();
  };
  const handleClickPrevButton = () => {
    if (direction === -1 || direction === undefined) {
      slider.current.append(slider.current.firstElementChild);
      setDirection(1);
    }
    setDirection(1);
    carousel.current.style.justifyContent = `flex-end`;
    slider.current.style.transform = `translate(20%)`;
  };
  const handleClickNextButton = () => {
    if (direction === 1) {
      slider.current.prepend(slider.current.lastElementChild);
      setDirection(-1);
    }
    setDirection(-1);
    carousel.current.style.justifyContent = `flex-start`;
    slider.current.style.transform = `translate(-20%)`;
  };
  // useEffect(() => {
  //   const handleMouseEnter = () => {
  //     console.log("enter");
  //     clearInterval(intervalId);
  //   };
  //   const handleMouseLeave = () => {
  //     console.log("leave");
  //     intervalId = setInterval(() => handleClickNextButton(), 5000);
  //   };
  //   let intervalId = setInterval(() => handleClickNextButton(), 5000);
  //   carousel.current.addEventListener("mouseenter", handleMouseEnter);
  //   carousel.current.addEventListener("mouseleave", handleMouseLeave);
  // }, []); // set interval and reset interval
  return (
    <Box className="container">
      <div className="carousel" ref={carousel}>
        <ul className="slider" ref={slider} onTransitionEnd={handleTransitionEnd}>
          {/* <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li> */}
          <li>
            <Image src="https://source.unsplash.com/random/?rain" layout="fill" alt="rain" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?coffee" layout="fill" alt="coffee" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?river" layout="fill" alt="river" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?cloud" layout="fill" alt="cloud" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?train" layout="fill" alt="train" />
          </li>
        </ul>
        <div className="controls">
          <div className="arrow prev" onClick={handleClickPrevButton}>
            <h1>Left</h1>
          </div>
          <div className="arrow next" onClick={handleClickNextButton}>
            <h1>Right</h1>
          </div>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.div`
  > .carousel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
    border: 2px solid green;
    > .slider {
      width: 500%;
      height: 100%;
      display: flex;
      flex-shrink: 0;
      transition: all 0.5s;
      > li {
        /* width: 20%;
        flex-basis: 20%; // N등분하여 20%의 가로길이를 가져간다. */
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        border: 2px solid;
        position: relative;
        /* background-color: #777; */
      }
    }
    > .controls {
      .arrow {
        height: 100%;
        width: 100px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        /* border: 1px solid red; */
      }
      .arrow:hover {
        color: white;
        background-color: rgba(3, 3, 3, 0.3);
      }
      .prev {
        left: 0;
      }
      .next {
        right: 0;
      }
    }
  }
`;
