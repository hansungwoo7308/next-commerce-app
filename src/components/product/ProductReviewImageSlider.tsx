import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { setModal } from "lib/client/store/modalSlice";
import { useDispatch } from "react-redux";

interface Props {
  data: [];
  displayCount: number;
}

export default function ProductReviewImageSlider({ data, displayCount }: Props) {
  // make the carousel
  const [direction, setDirection]: any = useState(null);
  const [slideIndex, setSlideIndex]: any = useState(0);
  const carouselRef: any = useRef();
  const sliderRef: any = useRef();
  const groupRef: any = useRef();
  const dispatch = useDispatch();

  // step 1
  const handleClickLeft = () => {
    if (direction === null && slideIndex === 0) {
      setDirection("left");
      setSlideIndex(groupedData.length - 1);
      return;
    }
    if (direction === "left" && slideIndex <= -1) return;
    setDirection("left");
    setSlideIndex((prev: any) => prev - 1);
  };
  const handleClickRight = () => {
    if (direction === "right" && slideIndex >= groupedData.length - 1) return;
    setDirection("right");
    setSlideIndex((prev: any) => prev + 1);
  };

  // step 2
  const moveSlider = () => {
    // 변경된 인덱스에 의해서 애니메이션
    sliderRef.current.style.transition = "transform 1s";
    sliderRef.current.style.transform = `translate(-${(100 / groupedData.length) * slideIndex}%)`;
    // sliderRef.current.style.transform = `translate(-${item.current.style.width * slideIndex}%)`;
  };
  useEffect(() => {
    console.log({ slideIndex });
    // if (slideIndex <= -1 && direction === "left") {
    //   console.log({ slider: sliderRef.current });

    //   sliderRef.current.append(sliderRef.current.firstElementChild);
    //   sliderRef.current.style.transform = `translateX(-${
    //     (100 / groupedData.length) * (groupedData.length - 1)
    //   }%)`;
    //   setSlideIndex(groupedData.length - 1); // 마지막으로 이동 (인덱스를 마지막으로 변경하고 다시 트랙킹하도록한다.)
    //   return;
    // }
    moveSlider();
  }, [slideIndex]);

  // step 3
  const handleTransitionEnd = () => {
    // sliderRef reconciliation
    // 스타일조정 : 애니메이션 무효화, 위치조정
    // 돔조정 : 이전과 이후의 페이지의 자연스러운 연결성을 위한 돔조정
    // 인덱스조정 : 슬라이드 인덱스조정
    if (slideIndex >= groupedData.length - 1 && direction === "right") {
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = "translateX(0)";
      sliderRef.current.prepend(sliderRef.current.lastElementChild);
      setSlideIndex(0); // 처음으로 이동 (인덱스를 처음으로 변경하고 다시 트랙킹하도록한다.)
    }
    if (slideIndex <= 0 && direction === "left") {
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = `translateX(-${
        (100 / groupedData.length) * (groupedData.length - 1)
      }%)`;
      sliderRef.current.append(sliderRef.current.firstElementChild);
      setSlideIndex(groupedData.length - 1); // 마지막으로 이동 (인덱스를 마지막으로 변경하고 다시 트랙킹하도록한다.)
    }
  };

  // group the images by displayCount
  const [groupedData, setGroupedData]: any = useState([]);
  const makeGroupedArray = () => {
    for (let i = 0; i < data.length; i += displayCount) {
      // groupedData.push(data.slice(i, i + 3));
      setGroupedData((state: any) => [...state, data.slice(i, i + displayCount)]);
    }
  };

  useEffect(() => {
    makeGroupedArray();
  }, []);

  // console.log({ groupedData });
  // console.log({ test: groupRef.current?.style.width });

  return (
    <Box className="container">
      <div className="carousel" ref={carouselRef}>
        <ul
          className="slider"
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
          style={{ width: `${100 * groupedData.length}%` }}
        >
          {groupedData.map((group: any) => (
            <li className="group" ref={groupRef}>
              <ul>
                {group.map((image: any) => (
                  <li
                    className="image-outer"
                    // style={{ flex: `${groupRef.current?.style.width / 3}` }}
                    onClick={() =>
                      dispatch(setModal({ active: true, type: "VIEW_IMAGE", src: image.url }))
                    }
                  >
                    {/* <Image src={`/images/${v}`} layout="fill" alt="alt" /> */}
                    <Image src={image.url} width={300} height={300} alt="alt" />
                  </li>
                ))}
              </ul>
            </li>
          ))}
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
    /* width: 300px; */
    height: 250px;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    position: relative;
    /* border: 5px solid green; */
    overflow: hidden;
    > .slider {
      /* width: 500%; */
      height: 100%;
      display: flex;
      /* children element가 축소되는 것을 방지 */
      /* 디폴트 값은 1이고 flex속성은 flexible한 배치를 갖기 때문에, 부모기준에 맟추어 가로나 세로사이즈가 유동적으로 된다. */
      flex-shrink: 0;
      transition: transform 1s;
      /* border: 2px solid coral; */
      > .group {
        /* width: 100%; */
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 1px solid red;
        > ul {
          /* flex:1; */
          width: 100%;
          height: 100%;
          display: flex;
          gap: 1rem;
          padding: 1rem;
          > li {
            flex: 1;
            /* width: 10rem; */
            flex-shrink: 0;
            border: 1px solid;
          }
        }
        .image-outer {
          cursor: pointer;
        }
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
