import Image from "next/image";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import styled from "styled-components";

interface Props {
  imageUrls: string[];
}

export default function SlickSlider({ imageUrls }: Props) {
  const sliderRef: any = useRef();

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
      >
        {imageUrls.map((imageUrl: any) => (
          // <img src={imageUrl} alt={imageUrl} />
          <Image src={imageUrl} alt="alt" width={300} height={300} />
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
