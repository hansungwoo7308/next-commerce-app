import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { json } from "stream/consumers";
import { styled } from "styled-components";
export default function Filters() {
  const router = useRouter();
  // category
  const allRef: any = useRef();
  const electronicsRef: any = useRef();
  const foodRef: any = useRef();
  const [categoryElements, setCategoryElements]: any = useState([]);
  // ratings
  const fiveRef: any = useRef();
  const fourRef: any = useRef();
  const threeRef: any = useRef();
  const twoRef: any = useRef();
  const oneRef: any = useRef();
  const [ratingsElements, setRatingsElements]: any = useState([]);
  const [ratingsValues, setRatingsValues]: any = useState([]);
  const addRatingsValue = (value: any) => {
    setRatingsValues([...ratingsValues, value]);
  };
  const removeRatingsValue = (value: any) => {
    const updatedState = ratingsValues.filter((v: any) => v !== value);
    setRatingsValues(updatedState);
  };
  const handleClick = (e: any) => {
    // input tag의 key, value
    const { name, value } = e.target;
    // console.log({ name, value });

    if (e.target.checked) addRatingsValue(value);
    else removeRatingsValue(value);

    // ratingsValues 배열에 이미 존재하면, 배열에서 제거
    // setRatingsValues((prevState: any) => {
    //   const newState = prevState.filter((v: any) => {
    //     if (v === value) {
    //       console.log({ v, value });
    //       return;
    //     }
    //     return v;
    //   });
    //   return [...prevState, newState];
    // });
    // ratingsValues.map((v: any) => console.log(v));
    // for (let value of ratingsValues) {
    //   console.log({ value });
    // }
    // console.log({ ratingsValues });
    // const newState = [...ratingsValues, value];
    // setRatingsValues((prevState: any) => {
    //   console.log({ prevState });
    //   if (prevState === value) return prevState;
    //   return newState;
    // });
    // console.log({ updatedState });
    // setRatingsValues(updatedState);

    // rating input elements 중에서 체크된 상태에 따라서, 상태변경을 해준다.
    // ratingsValues.map((ratingsValue: any) => {
    //   // // 중복필드는 패스한다.
    //   // if(ratingsValue===name) return
    //   // // 새
    //   // return [...ratingsValues,value]
    // });
    // ratingsElements.map((element: any) => {
    //   if (element.checked) {
    //     setRatingsValues((state: any) => [...state, element.value]);
    //   }
    // });

    // query key 에서 중복필드를 검사한다.
    // if (name === "ratings") {
    //   for (let key in router.query) {
    //     if (key === name) {
    //       // 중복필드에 append 한다.
    //       router.query = { ...router.query, [name]: router.query[name] + "+" + value };
    //       router.push({ pathname: router.pathname, query: router.query });
    //       return;
    //     }
    //   }
    // }

    router.query = { ...router.query, [name]: value };
    // router.query = { ...router.query, [name]: value };
    // router.push({ pathname: router.pathname, query: router.query });
  };
  useEffect(() => {
    console.log({ ratingsValues });
    const test = ratingsValues.reduce((a: any, v: any, i: any) => {
      if (i === 0) return v;
      return a + "+" + v;
    }, "");
    console.log({ test });
    router.query = { ...router.query, ratings: test };
    router.push({ pathname: router.pathname, query: router.query });
  }, [ratingsValues]);
  useEffect(() => {
    // 관리할 input elements를 셋팅한다.
    setCategoryElements([allRef.current, electronicsRef.current, foodRef.current]);
    setRatingsElements([
      fiveRef.current,
      fourRef.current,
      threeRef.current,
      twoRef.current,
      oneRef.current,
    ]);
  }, []);
  useEffect(() => {
    // router query 가 없으면, 초기화한다.
    if (!router.query.category) {
      allRef.current.checked = true;
    }
    if (!router.query.ratings) {
      ratingsElements.map((elements: any) => {
        elements.checked = false;
      });
    }
  }, [router.query.category, router.query.ratings]);
  useEffect(() => {
    // element values 중에서 router query parameter 와 일치하면. element 를 체크해준다.
    categoryElements.map((element: any) => {
      if (element.value === router.query.category) element.checked = true;
    });
    ratingsElements.map((element: any) => {
      if (element.value === router.query.ratings) element.checked = true;
    });
  }, [categoryElements, ratingsElements]);
  return (
    <Box>
      <div className="category">
        <h3>Category</h3>
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
      <div className="ratings">
        <h3>Ratings</h3>
        <ul>
          <li>
            <label>
              <input ref={fiveRef} type="checkbox" name="ratings" value="5" onClick={handleClick} />
              <span>*****</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={fourRef} type="checkbox" name="ratings" value="4" onClick={handleClick} />
              <span>****</span>
            </label>
          </li>
          <li>
            <label>
              <input
                ref={threeRef}
                type="checkbox"
                name="ratings"
                value="3"
                onClick={handleClick}
              />
              <span>***</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={twoRef} type="checkbox" name="ratings" value="2" onClick={handleClick} />
              <span>**</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={oneRef} type="checkbox" name="ratings" value="1" onClick={handleClick} />
              <span>*</span>
            </label>
          </li>
        </ul>
      </div>
      <h1>RaringsValues : {JSON.stringify(ratingsValues)}</h1>

      {/* <div className="ratings">
        <h3>Ratings</h3>
        <ul>
          <li>
            <label>
              <input ref={fiveRef} type="radio" name="ratings" value="5" onClick={handleClick} />
              <span>*****</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={fourRef} type="radio" name="ratings" value="4" onClick={handleClick} />
              <span>****</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={threeRef} type="radio" name="ratings" value="3" onClick={handleClick} />
              <span>***</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={twoRef} type="radio" name="ratings" value="2" onClick={handleClick} />
              <span>**</span>
            </label>
          </li>
          <li>
            <label>
              <input ref={oneRef} type="radio" name="ratings" value="1" onClick={handleClick} />
              <span>*</span>
            </label>
          </li>
        </ul>
      </div> */}
      {/* <div className="test">
        <h3>Test</h3>
        <ul>
          <li>
            <label>
              <input type="checkbox" name="test" value="a" onClick={handleClick} />
              <span>a</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="test" value="b" onClick={handleClick} />
              <span>b</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="test" value="c" onClick={handleClick} />
              <span>c</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="test" value="d" onClick={handleClick} />
              <span>d</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="test" value="e" onClick={handleClick} />
              <span>e</span>
            </label>
          </li>
        </ul>
      </div> */}
    </Box>
  );
}
const Box = styled.div`
  /* padding: 1rem; */
  border: 2px solid green;
  display: flex;
  gap: 1rem;
  > * {
    border: 2px solid;
    padding: 1rem;
  }
`;
