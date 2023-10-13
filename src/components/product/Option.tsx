import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function Option() {
  const optionListRef: any = useRef(null);

  const handleClickOption = (e: any) => {
    e.stopPropagation();
    const optionList: HTMLElement = optionListRef.current;
    optionList.classList.toggle("option-list-toggle");
  };

  useEffect(() => {
    window.addEventListener(
      "click",
      // close the option ul tag
      () => {
        const option: HTMLElement = optionListRef.current;
        option.classList.remove("option-list-toggle");
      }
    );
  }, []);

  return (
    <Box>
      <div className="option">
        <a className="option-guide" href="#" onClick={handleClickOption}>
          Select the item
        </a>
        <ul className="option-list" ref={optionListRef}>
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
