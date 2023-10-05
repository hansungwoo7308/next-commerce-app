import Image from "next/image";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import styled from "styled-components";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { setModal } from "lib/client/store/modalSlice";

interface Props {
  imageUrls: string[];
  multipleItemNumber?: number | null;
  actionType?: string;
}

export default function SlickSlider({ imageUrls, multipleItemNumber, actionType }: Props) {
  const sliderRef: any = useRef();
  const dispatch = useDispatch();

  console.log({ imageUrls });

  const handleClickImage = (imageUrl: string) => {
    console.log("first");
    if (!actionType) return;
    if (actionType === "VIEW_IMAGE")
      dispatch(setModal({ active: true, type: "VIEW_IMAGE", src: imageUrl }));
  };

  if (multipleItemNumber) {
    return (
      <Box>
        <Slider
          ref={sliderRef}
          arrows={false}
          dots={true}
          speed={1000}
          // autoplay={true}
          // autoplaySpeed={5000}
          // pauseOnHover={true}
          slidesToShow={multipleItemNumber}
          slidesToScroll={multipleItemNumber}
        >
          {imageUrls.map((imageUrl: any) => (
            // <img src={imageUrl} alt={imageUrl} />
            <Image
              key={imageUrl}
              className="image"
              src={imageUrl}
              alt="alt"
              width={300}
              height={300}
              onClick={(e) => handleClickImage(imageUrl)}
            />
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
  return (
    <Box>
      <Slider
        ref={sliderRef}
        arrows={false}
        dots={true}
        speed={1000}
        // autoplay={true}
        // autoplaySpeed={5000}
        // pauseOnHover={true}
        // slidesToShow={multipleItemNumber ? multipleItemNumber:null}
        // slidesToScroll={multipleItemNumber ? multipleItemNumber:null}
        // {...test}
      >
        {imageUrls.map((imageUrl: any) => (
          // <img src={imageUrl} alt={imageUrl} />
          <Image
            key={imageUrl}
            className="image"
            src={imageUrl}
            alt="alt"
            width={300}
            height={300}
            onClick={(e) => handleClickImage(imageUrl)}
          />
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
  height: 200px;
  position: relative;

  .image {
    border: 1px solid red;
  }

  .slick-slider {
    height: 100%;
    position: relative;
    overflow: hidden;
    .slick-dots {
      position: absolute;
      bottom: 1rem;
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
  img {
    width: 100%;
    height: 200px;
  }
  button:hover {
    background-color: initial;
  }
`;
