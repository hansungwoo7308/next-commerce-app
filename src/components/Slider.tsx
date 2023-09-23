import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const data = [
  "slide-01.jpg",
  "slide-02.jpg",
  "slide-01.jpg",
  "slide-02.jpg",
  "slide-01.jpg",
  "slide-02.jpg",
];
export default function Slider() {
  const [direction, setDirection]: any = useState(null);
  const [slideIndex, setSlideIndex]: any = useState(0);
  const carousel: any = useRef();
  const slider: any = useRef();
  const item: any = useRef();
  const handleTransitionEnd = () => {
    // slider reconciliation
    // 스타일조정 : 애니메이션 무효화, 위치조정
    // 돔조정 : 이전과 이후의 페이지의 자연스러운 연결성을 위한 돔조정
    // 인덱스조정 : 슬라이드 인덱스조정
    if (slideIndex >= data.length - 1 && direction === "right" && direction !== null) {
      slider.current.style.transition = "none";
      slider.current.style.transform = "translateX(0)";
      slider.current.prepend(slider.current.lastElementChild);
      setSlideIndex(0); // 처음으로 이동 (인덱스를 처음으로 변경하고 다시 트랙킹하도록한다.)
    }
    if (slideIndex <= 0 && direction === "left" && direction !== null) {
      slider.current.style.transition = "none";
      slider.current.style.transform = `translateX(-${(100 / data.length) * (data.length - 1)}%)`;
      slider.current.append(slider.current.firstElementChild);
      setSlideIndex(data.length - 1); // 마지막으로 이동 (인덱스를 마지막으로 변경하고 다시 트랙킹하도록한다.)
    }
  };
  const handleClickLeft = () => {
    if (direction === "left" && slideIndex <= 0) return;
    setDirection("left");
    setSlideIndex((prev: any) => prev - 1);
  };
  const handleClickRight = () => {
    if (direction === "right" && slideIndex >= data.length - 1) return;
    setDirection("right");
    setSlideIndex((prev: any) => prev + 1);
  };
  useEffect(() => {
    console.log({ slideIndex });
    // 변경된 인덱스에 의해서 애니메이션
    slider.current.style.transition = "all 1s";
    slider.current.style.transform = `translate(-${(100 / data.length) * slideIndex}%)`;
    // slider.current.style.transform = `translate(-${item.current.style.width * slideIndex}%)`;
  }, [slideIndex]);
  // useEffect(() => {
  //   console.log({ currentSlideIndex: slideIndex });
  //   // if (slideIndex === 4 && direction === "right") {
  //   //   slider.current.style.transition = "none";
  //   //   slider.current.style.transform = "translateX(0)";
  //   //   slider.current.prepend(slider.current.lastElementChild);

  //   //   // slider.current.prepend(slider.current.lastElementChild);
  //   // }
  // }, [slideIndex]);
  // useEffect(() => {
  //   const handleMouseEnter = () => {
  //     console.log("enter");
  //     clearInterval(intervalId);
  //   };
  //   const handleMouseLeave = () => {
  //     console.log("leave");
  //     intervalId = setInterval(() => handleClickRight(), 5000);
  //   };
  //   let intervalId = setInterval(() => handleClickRight(), 5000);
  //   carousel.current.addEventListener("mouseenter", handleMouseEnter);
  //   carousel.current.addEventListener("mouseleave", handleMouseLeave);
  // }, []); // set interval and reset interval
  return (
    <Box className="container">
      <div className="carousel" ref={carousel}>
        <ul
          className="slider"
          ref={slider}
          onTransitionEnd={handleTransitionEnd}
          style={{ width: `${100 * data.length}%` }}
        >
          {data.map((v: any, index: any) => (
            <li className="item" ref={item}>
              {/* <Image src={`/images/${v}`} layout="fill" alt="alt" /> */}
              {index}
            </li>
          ))}
          {/* <li>
            <Image src="/images/slide-01.jpg" layout="fill" alt="rain" />
          </li>
          <li>
            <Image src="/images/slide-02.jpg" layout="fill" alt="coffee" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?river" layout="fill" alt="river" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?cloud" layout="fill" alt="cloud" />
          </li>
          <li>
            <Image src="https://source.unsplash.com/random/?train" layout="fill" alt="train" />
          </li> */}
        </ul>
        <div className="controls">
          <div className="arrow prev" onClick={handleClickLeft}>
            <IoIosArrowBack />
          </div>
          <div className="arrow next" onClick={handleClickRight}>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.div`
  /* height: calc(100vh - 100px); */
  padding: 1rem;
  > .carousel {
    width: 300px;
    height: 250px;
    margin: auto;
    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: flex-start;
    position: relative;
    border: 5px solid green;
    /* overflow: hidden; */
    > .slider {
      /* width: 500%; */
      height: 100%;
      display: flex;
      /* children element가 축소되는 것을 방지 */
      /* 디폴트 값은 1이고 flex속성은 flexible한 배치를 갖기 때문에, 부모기준에 맟추어 가로나 세로사이즈가 유동적으로 된다. */
      flex-shrink: 0;
      transition: all 1s;
      border: 2px solid coral;
      > li {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .item {
        border: 2px solid;
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
