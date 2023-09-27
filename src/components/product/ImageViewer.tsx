import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  images?: any;
}

export default function ImageViewer({ images }: Props) {
  // set the image index
  const [tabIndex, setTabIndex]: any = useState(0);

  return (
    <Box>
      <div className="selected-image">
        <Image
          src={images[tabIndex].url || images[tabIndex].secure_url}
          alt={images[tabIndex].url || images[tabIndex].secure_url}
          width={1000}
          height={1000}
        />
      </div>
      <div className="unselected-images">
        {images.map((image: any, index: any) => (
          <Image
            className={`${index === tabIndex ? "active" : ""}`}
            key={index}
            src={image.url || image.secure_url}
            alt={image.url || image.secure_url}
            width={500}
            height={500}
            onMouseEnter={() => setTabIndex(index)}
            // onClick={() => setTabIndex(index)}
          />
        ))}
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .selected-image {
    width: 25rem;
    height: 25rem;
  }
  .unselected-images {
    display: flex;
    gap: 0.5rem;
    > img {
      width: 3rem;
      height: 3rem;
    }
    .active {
      outline: 2px solid black;
    }
  }
`;
