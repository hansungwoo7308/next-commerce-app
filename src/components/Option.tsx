import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function Option() {
  // set the option
  const optionRef: any = useRef(null);
  const handleClickOption = (e: any) => {
    e.stopPropagation();
    const option: HTMLElement = optionRef.current;
    option.classList.toggle("option-list-toggle");
  };
  // close the option ul tag
  useEffect(() => {
    window.addEventListener("click", () => {
      const option: HTMLElement = optionRef.current;
      option.classList.remove("option-list-toggle");
    });
  }, []);

  return (
    <Box>
      <div className="option">
        <a className="option-guide" href="#" onClick={handleClickOption}>
          Select the item
        </a>
        <ul className="option-list" ref={optionRef}>
          <li className="option-item">
            <a href="#">1</a>
          </li>
          <li className="option-item">
            <a href="#">2</a>
          </li>
          <li className="option-item">
            <a href="#">3</a>
          </li>
          <li className="option-item">
            <a href="#">4</a>
          </li>
        </ul>
      </div>
    </Box>
  );
}

const Box = styled.div`
  .option {
    position: relative;
    background-color: gray;
    .option-guide {
      width: 100%;
      display: block;
      border: 1px solid #ededed;
      padding: 0.5rem;
    }
    .option-list {
      width: 100%;
      transition: all 1s;
      position: absolute;
      top: 100%;
      background-color: #aaa;
      color: #000;
      border: 1px solid #ededed;
      border-top: none;
      display: none;
      .option-item {
        a {
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          display: block;
        }
      }
    }
    .option-list-toggle {
      display: block;
    }
  }
`;
