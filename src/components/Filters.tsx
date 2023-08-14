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
  const [ratings, setRatings]: any = useState([]);
  const [ratingsElements, setRatingsElements]: any = useState([]);
  // category handler
  const handleClickCategory = (e: any) => {
    const { name, value } = e.target;
    router.query = { ...router.query, [name]: value };
    router.push({ pathname: router.pathname, query: router.query });
    // ratings 배열에 이미 존재하면, 배열에서 제거
    // setRatings((prevState: any) => {
    //   const newState = prevState.filter((v: any) => {
    //     if (v === value) {
    //       console.log({ v, value });
    //       return;
    //     }
    //     return v;
    //   });
    //   return [...prevState, newState];
    // });
    // ratings.map((v: any) => console.log(v));
    // for (let value of ratings) {
    //   console.log({ value });
    // }
    // console.log({ ratings });
    // const newState = [...ratings, value];
    // setRatings((prevState: any) => {
    //   console.log({ prevState });
    //   if (prevState === value) return prevState;
    //   return newState;
    // });
    // console.log({ updatedState });
    // setRatings(updatedState);
    // rating input elements 중에서 체크된 상태에 따라서, 상태변경을 해준다.
    // ratings.map((ratingsValue: any) => {
    //   // // 중복필드는 패스한다.
    //   // if(ratingsValue===name) return
    //   // // 새
    //   // return [...ratings,value]
    // });
    // ratingsElements.map((element: any) => {
    //   if (element.checked) {
    //     setRatings((state: any) => [...state, element.value]);
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
  };
  // category effectors
  useEffect(() => {
    // router query 가 없으면, 초기화한다.
    if (!router.query.category) {
      allRef.current.checked = true;
    }
  }, [router.query.category]);
  useEffect(() => {
    // element values 중에서 router query parameter 와 일치하면. element 를 체크해준다.
    categoryElements.map((element: any) => {
      if (element.value === router.query.category) element.checked = true;
    });
  }, [categoryElements]);
  // ratings handlers
  const addRatingsValue = (value: any) => {
    setRatings([...ratings, value]);
  };
  const removeRatingsValue = (value: any) => {
    const updatedState = ratings.filter((v: any) => v !== value);
    setRatings(updatedState);
  };
  const handleClickRatings = (e: any) => {
    const { value } = e.target;
    if (e.target.checked) addRatingsValue(value);
    else removeRatingsValue(value);
  };
  // ratings effectors
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
  }, []); // elements references 를 localState 에 저장한다.
  useEffect(() => {
    const localStorageRatings = localStorage.getItem("ratings");
    if (!localStorageRatings) return;
    if (!ratings.length) {
      console.log({ localStorageRatings });
      const splittedRatings = localStorageRatings.split("+");
      console.log({ splittedRatings });
      setRatings(splittedRatings);
    }
  }, []); // localStorage 에서 데이터를 가져와서 localState 에 저장한다.
  useEffect(() => {
    console.log({ ratings });
    // no ratings, remove the localStorage.ratings and router.query.ratings
    // ratings state 가 없으면 localStorage, router.query 에 저장된 데이터를 클리어해준다.
    if (!ratings.length) {
      localStorage.removeItem("ratings");
      delete router.query.ratings;
      router.push({ pathname: router.pathname, query: router.query });
      return;
    }
    // stringify the ratings
    const stringfiedRatings = ratings.reduce((a: any, v: any, i: any) => {
      if (i === 0) return v;
      return a + "+" + v;
    }, "");
    // set the localStorage and router.query
    localStorage.setItem("ratings", stringfiedRatings);
    router.query = { ...router.query, ratings: stringfiedRatings };
    // out
    router.push({ pathname: router.pathname, query: router.query });
    ratingsElements.map((element: any) => {
      ratings.map((value: any) => {
        if (element.value === value) element.checked = true;
      });
    });
  }, [ratings]); // localStorage, router.query 에 저장한다. router.push() 로 요청한다.
  return (
    <Box>
      <div className="filters">
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
                  onClick={handleClickCategory}
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
                  onClick={handleClickCategory}
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
                  onClick={handleClickCategory}
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
                <input
                  ref={fiveRef}
                  type="checkbox"
                  name="ratings"
                  value="5"
                  onClick={handleClickRatings}
                />
                <span>*****</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  ref={fourRef}
                  type="checkbox"
                  name="ratings"
                  value="4"
                  onClick={handleClickRatings}
                />
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
                  onClick={handleClickRatings}
                />
                <span>***</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  ref={twoRef}
                  type="checkbox"
                  name="ratings"
                  value="2"
                  onClick={handleClickRatings}
                />
                <span>**</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  ref={oneRef}
                  type="checkbox"
                  name="ratings"
                  value="1"
                  onClick={handleClickRatings}
                />
                <span>*</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      {/* <h3>RaringsValues : {JSON.stringify(ratings)}</h3> */}
    </Box>
  );
}
const Box = styled.div`
  padding: 1rem;
  border: 2px solid green;
  > .filters {
    border: 2px solid;
    border-radius: 10px;
    padding: 1rem;
    background-color: #333;
    display: flex;
    gap: 1rem;
    > div {
      /* border: 2px solid; */
      > ul {
        margin-top: 0.5rem;
      }
    }
  }
  /* > * {
    border: 2px solid;
    padding: 1rem;
  } */
`;
