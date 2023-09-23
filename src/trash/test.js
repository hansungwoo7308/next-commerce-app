import { useState } from "react"; // New

import "./infinite-carousel.css";

export default function InfiniteCarousel({ images }) {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0); // New

  function changeToNextImage() {
    // New
    const newDisplayedImageIndex = // New
      displayedImageIndex !== images.length - 1 ? displayedImageIndex + 1 : 0; // New

    setDisplayedImageIndex(newDisplayedImageIndex); // New
  } // New

  function changeToPrevImage() {
    const newDisplayedImageIndex = // New
      displayedImageIndex !== 0 ? displayedImageIndex - 1 : images.length - 1; // New

    setDisplayedImageIndex(newDisplayedImageIndex); // New
  } // New

  return (
    <>
      <div className="container">
        <div className="infinite-carousel">
          <ul className="images">
            {images.map((image, index) => (
              <li
                key={index}
                className={`images__li${
                  displayedImageIndex === index ? " images__li--displayed" : "" // New
                }`}
              >
                <img src={image} alt="carousel-image" className="image" />
              </li>
            ))}
          </ul>
        </div>
        <button className="previous-image" onClick={changeToPrevImage}>
          Previous Image
        </button>
        <button className="next-image" onClick={changeToNextImage}>
          Next Image
        </button>
      </div>
    </>
  );
}

/*
import Image from "next/image";
import useInfiniteSlider from "../hooks/use-infinite-slider";

export default function InfiniteCarousel({ images }) {
  images = images.length === 1 ? [...images, ...images, ...images] : images;
  images = images.length === 2 ? [...images, ...images] : images;

  const transitionTime = 100;
  const [currImageIndex, showedImages, changeImage] = useInfiniteSlider(
    images,
    transitionTime
  );

  function calculateTranslate(imageIndex) {
    const prevImageIndex =
      currImageIndex === 0 ? images.length - 1 : currImageIndex - 1;
    const isPrevImage = prevImageIndex === imageIndex;

    const nextImageIndex =
      currImageIndex === images.length - 1 ? 0 : currImageIndex + 1;
    const isNextImage = nextImageIndex === imageIndex;

    let translate = "0%";
    if (isPrevImage) translate = "-100%";
    if (isNextImage) translate = "100%";

    return translate;
  }

  return (
    <>
      <div>
        <ul>
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                "--opacity": Number(showedImages[index]),
                "--translate": calculateTranslate(index),
              }}
            >
              <Image src={image} layout="fill" className="img" />
            </li>
          ))}
        </ul>
        <button onClick={changeImage("left")} className="left">
          <span className="slider-arrow-left" />
        </button>
        <button onClick={changeImage("right")} className="right">
          <span className="slider-arrow-right" />
        </button>
      </div>
      <style jsx>{`
        div {
          min-width: 1000px;
          max-width: 1500px;
          height: 600px;
          overflow: hidden;
          margin: auto;
          position: relative;
        }

        div:before {
          position: absolute;
          content: "";
          display: block;
          background: linear-gradient(-180deg, rgba(234, 237, 237, 0), #eaeded);
          height: 50%;
          width: 100%;
          bottom: 0;
          z-index: 25;
        }

        ul {
          width: 1500px;
          height: 100%;
          display: flex;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        li {
          position: absolute;
          left: 0;
          top: 0;
          transition: transform ${transitionTime / 1000}s linear;
          opacity: var(--opacity);
          transform: translateX(var(--translate));
          width: 1500px;
          height: 600px;
          background-color: lightgray;
        }

        button {
          width: 80px;
          height: 246px;
          border: none;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: absolute;
          top: 1px;
        }

        button.left {
          left: 2px;
        }

        button.right {
          right: 2px;
        }

        button:focus {
          border: 2px solid var(--white);
          outline: 2px solid var(--blue-lagoon);
          border-radius: 5px;
        }

        .slider-arrow-left,
        .slider-arrow-right {
          display: block;
          width: 34px;
          height: 52px;
          background: url("/images/slider-arrows.png");
          background-size: 68px 52px;
          background-repeat: no-repeat;
        }

        .slider-arrow-left {
          background-position: left center;
        }

        .slider-arrow-right {
          background-position: right center;
        }
      `}</style>
    </>
  );
}

import { useState } from "react";

export default function useInfiniteSlider(images, transitionTime) {
  const [showedImages, setShowedImages] = useState(() => {
    const value = Object.assign({}, Array(images.length).fill(false));
    value[0] = true;
    return value;
  });

  const [currImageIndex, setCurrImageIndex] = useState(0);

  function changeImage(direction) {
    return () => {
      switch (direction) {
        case "right":
          const nextImageIndex =
            currImageIndex === images.length - 1 ? 0 : currImageIndex + 1;

          setShowedImages((showedImages) =>
            Object.assign(showedImages, { [nextImageIndex]: true })
          );
          setCurrImageIndex(nextImageIndex);
          break;

        case "left":
          const prevImageIndex =
            currImageIndex === 0 ? images.length - 1 : currImageIndex - 1;

          setShowedImages((showedImages) =>
            Object.assign(showedImages, { [prevImageIndex]: true })
          );
          setCurrImageIndex(prevImageIndex);
          break;
      }

      setTimeout(() => {
        setShowedImages((showedImages) =>
          Object.assign(showedImages, { [currImageIndex]: false })
        );
      }, transitionTime);
    };
  }

  return [currImageIndex, showedImages, changeImage];
}
*/
