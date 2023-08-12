import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
export default function Filters() {
  const router = useRouter();
  const allRef: any = useRef();
  const electronicsRef: any = useRef();
  const foodRef: any = useRef();
  const [elements, setElements]: any = useState([]);
  const handleClick = (e: any) => {
    const { name, value } = e.target;
    // router.query[name] = value;
    router.query = { [name]: value };
    router.push({ pathname: router.pathname, query: router.query });
  };
  useEffect(() => {
    // 선택된 elements를 셋팅한다.
    setElements([allRef.current, electronicsRef.current, foodRef.current]);
  }, []);
  useEffect(() => {
    // element values 중에서 router query parameter 와 일치하면. element 를 체크해준다.
    elements.map((element: any) => {
      if (element.value === router.query.category) element.checked = true;
    });
  }, [elements]);
  return (
    <Box>
      <div className="category">
        <h1>Category</h1>
        <ul>
          <li>
            <label>
              <input
                ref={allRef}
                type="radio"
                name="category"
                value="all"
                onClick={handleClick}
                defaultChecked
              />
              <span>All</span>
            </label>
          </li>
          <li>
            <label>
              <input
                ref={electronicsRef}
                type="radio"
                name="category"
                value="electronics"
                onClick={handleClick}
              />
              <span>Electronics</span>
            </label>
          </li>
          <li>
            <label>
              <input
                ref={foodRef}
                type="radio"
                name="category"
                value="food"
                onClick={handleClick}
              />
              <span>Food</span>
            </label>
          </li>
        </ul>
      </div>
    </Box>
  );
}
const Box = styled.div`
  padding: 1rem;
  border: 2px solid green;
  .category {
    border: 2px solid;
  }
`;
