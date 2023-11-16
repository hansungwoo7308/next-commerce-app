import Image from "next/image";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "lib/client/store/modalSlice";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  items?: any[];
  itemSize?: any;
  sliderSize?: any;
  actionType?: string;
  settings?: any;
}

export default function SlickSlider({ items, itemSize, sliderSize, actionType, settings }: Props) {
  const sliderRef: any = useRef();
  const dispatch = useDispatch();

  const handleClickImage = (imageUrl: string) => {
    if (!actionType) return;
    if (actionType === "VIEW_IMAGE")
      dispatch(setModal({ active: true, type: "VIEW_IMAGE", src: imageUrl }));
  };

  // if (multipleItemNumber) {
  //   return (
  //     <Box>
  //       <Slider
  //         ref={sliderRef}
  //         arrows={false}
  //         speed={1000}
  //         infinite={true}
  //         // dots={dots}
  //         slidesToShow={multipleItemNumber}
  //         slidesToScroll={multipleItemNumber}
  //         {...settings}
  //       >
  //         {items?.map((item: any) => (
  //           <div className="img-outer" key={item.id}>
  //             <Image
  //               src={item.url}
  //               alt="alt"
  //               width={300}
  //               height={300}
  //               onClick={(e) => handleClickImage(item.url)}
  //             />
  //             {item.text && (
  //               <div className="text">
  //                 <h1>{item.text}</h1>
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </Slider>
  //       <div className="controller">
  //         <button className="prev arrow" onClick={() => sliderRef.current.slickPrev()}>
  //           <IoIosArrowBack size={20} color="#fff" />
  //         </button>
  //         <button className="next arrow" onClick={() => sliderRef.current.slickNext()}>
  //           <IoIosArrowForward size={20} color="#fff" />
  //         </button>
  //       </div>
  //     </Box>
  //   );
  // }

  // console.log({ items });

  if (!itemSize.width || !itemSize.height) {
    return null;
  }
  return (
    <Box style={{ height: sliderSize?.height || itemSize.height }}>
      <Slider ref={sliderRef} arrows={false} {...settings}>
        {items?.map((item: any) => (
          <div key={item.id} className="img-outer">
            <Image
              src={item.url}
              alt="alt"
              width={itemSize.width}
              height={itemSize.height}
              style={{ height: sliderSize?.height }}
              onClick={(e) => handleClickImage(item.url)}
            />
            {item.text && (
              <div className="text">
                <h1>{item.text}</h1>
              </div>
            )}
          </div>
        ))}
      </Slider>
      <div className="controller">
        <button className="prev arrow" onClick={() => sliderRef.current.slickPrev()}>
          <IoIosArrowBack size={20} color="#fff" />
        </button>
        <button className="next arrow" onClick={() => sliderRef.current.slickNext()}>
          <IoIosArrowForward size={20} color="#fff" />
        </button>
      </div>
    </Box>
  );
}

const Box = styled.div`
  /* height: 300px; */
  position: relative;

  /* public */
  .img-outer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      background-color: rgba(0, 0, 0, 0.5);
      pointer-events: none;
      padding: 1rem;
    }
    img {
      cursor: pointer;
    }
  }
  button:hover {
    background-color: initial;
  }

  /* children */
  .slick-slider {
    height: 100%;
    position: relative;
    /* overflow: hidden; */
    .slick-list {
      height: 100%;
      .slick-track {
        height: 100%;
        .slick-slide {
          height: 100%;
          overflow: hidden;
          /* border: 1px solid red; */
          div {
            height: 100%;
          }
        }
      }
    }
    .slick-dots {
      position: absolute;
      bottom: 1rem;
      pointer-events: none;
      li {
        pointer-events: auto;
      }
    }
  }
  .controller {
    .arrow {
      height: 100%;
      &:hover {
        color: #000;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .prev {
      width: 5rem;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    .next {
      width: 5rem;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
`;
