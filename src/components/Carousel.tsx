import { useEffect, useState } from "react";
import styled from "styled-components";
const images = ["a", "b", "c", "d", "e"];
export default function Carousel() {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0); // New
  const [threeSlides, setThreeSlides]: any = useState([]);
  function changeToPrevImage() {
    const newDisplayedImageIndex = // New
      displayedImageIndex !== 0 ? displayedImageIndex - 1 : images.length - 1; // New

    setDisplayedImageIndex(newDisplayedImageIndex); // New
  }
  function changeToNextImage() {
    const newDisplayedImageIndex =
      displayedImageIndex !== images.length - 1 ? displayedImageIndex + 1 : 0;
    setDisplayedImageIndex(newDisplayedImageIndex);
  }
  useEffect(() => {
    const center = document.querySelector(".images__li--displayed");
    const left = center?.previousSibling || center?.parentNode?.lastChild;
    const right = center?.nextSibling || center?.parentNode?.firstChild;
    // left.style.left = "-100%";
    // left.style.border = "2px solid green";
    // left.style.opacity = "1";
    // right.style.left = "100%";
    // right.style.border = "2px solid green";
    // right.style.opacity = "1";
    setThreeSlides([left, center, right]);
  }, [displayedImageIndex]);
  useEffect(() => {
    console.log({ threeSlides });
    threeSlides.map((slide: any) => console.log({ slide }));
  }, [threeSlides]);
  return (
    <Box>
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
                {/* <img src={image} alt="carousel-image" className="image" /> */}
                <h1>{image}</h1>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="previous-image"
          // onClick={
          //   changeToPrevImage // New
          // }
        >
          Previous Image
        </button>
        <button
          className="next-image"
          onClick={
            changeToNextImage // New
          }
        >
          Next Image
        </button>
      </div>
      <div>
        <ul style={{ width: "300px" }}>
          {/* {threeSlides.map(
            (slide: any) => (
              <li>{slide}</li>
            )
            // ({ slide })
          )} */}
        </ul>
      </div>
    </Box>
  );
}
const Box = styled.div`
  margin-top: 3rem;
  .container {
    width: 300px;
    /* width: 1500px; */
    max-width: 90%;
    margin: auto;
    position: relative;
  }

  .infinite-carousel {
    width: 300px;
    height: 300px;
    /* position: relative; */
    /* border: 10px solid green; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
  }

  .images {
    border: 2px solid red;
    width: 300%;
    height: 100%;
    flex-shrink: 0;
  }

  .images__li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* min-width: 100%; */
    height: 100%;
    object-fit: cover;
    /* New */
    opacity: 0;

    border: 3px solid blue;
  }

  .images__li--displayed {
    /* New */
    opacity: 1;
    border: 2px solid yellow;
  }

  .image {
    height: 100%;
    min-width: 100%;
  }

  /* You can change the following styles */
  .previous-image,
  .next-image {
    position: absolute;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #444;
    color: #fff;
    font-size: 16px;
    margin-top: 10px;
    border-radius: 5px;
  }

  .previous-image:hover,
  .next-image:hover {
    text-shadow: 0 0 5px #fff;
  }

  .previous-image {
    left: 0;
  }

  .next-image {
    right: 0;
  }
`;
