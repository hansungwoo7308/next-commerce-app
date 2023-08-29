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
    // const newState = [...ratings, value];
    // setRatings((prevState: any) => {
    //   console.log({ prevState });
    //   if (prevState === value) return prevState;
    //   return newState;
    // });
    // setRatings(updatedState);
    // rating input elements 중에서 체크된 상태에 따라서, 상태변경을 해준다.
    // ratings.map((ratingsValue: any) => {
    //   // // 중복필드는 패스한다.
    //   // if(ratingsValue===name) return
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
  const handleClickRatings = (e: any) => {
    const addRatings = (value: any) => {
      setRatings((state: any) => [...state, value]);
    };
    const removeRatings = (value: any) => {
      setRatings((state: any) => state.filter((v: any) => v !== value));
    };
    e.target.checked ? addRatings(e.target.value) : removeRatings(e.target.value);
  };
  useEffect(() => {
    setCategoryElements([allRef.current, electronicsRef.current, foodRef.current]);
    setRatingsElements([
      fiveRef.current,
      fourRef.current,
      threeRef.current,
      twoRef.current,
      oneRef.current,
    ]);
    // 카테고리 쿼리가 없으면, 카테고리 all에 체크한다.
    if (!router.query.category) allRef.current.checked = true;
  }, []); // initialize
  useEffect(() => {
    // get the ratings
    const localStorageRatings = localStorage.getItem("ratings"); // string
    if (!localStorageRatings) return;
    // console.log({ localStorageRatings });
    // console.log({ splittedRatings });

    // set the state for checking ratings
    const splittedRatings = localStorageRatings.split("+"); // array
    setRatings(splittedRatings);

    // set the router for querying filtered data
    router.query = { ...router.query, ratings: localStorageRatings };
    router.push({ pathname: router.pathname, query: router.query });
  }, []); // ratings waterfall
  useEffect(() => {
    categoryElements.map((element: any) => {
      if (element.value === router.query.category) element.checked = true;
    });
  }, [categoryElements]); // categoryElements로부터 쿼리와 일치하는 해당항목에 체크한다.
  useEffect(() => {
    // log
    console.log({ ratings });

    // exception
    // ratings가 없으면 로컬스토리지와 라우터쿼리에 저장된 데이터를 삭제한다.
    if (!ratings.length) {
      localStorage.removeItem("ratings");
      delete router.query.ratings;
      router.push({ pathname: router.pathname, query: router.query });
      return;
    }

    // cache
    // save to localStorage
    // stringify the ratings (array > string)
    const stringfiedRatings = ratings.reduce((a: any, v: any, i: any) => {
      if (i === 0) return v;
      return a + "+" + v;
    }, "");
    // set the localStorage
    localStorage.setItem("ratings", stringfiedRatings);

    // query
    router.query = { ...router.query, ratings: stringfiedRatings };
    router.push({ pathname: router.pathname, query: router.query });

    // mark as checked
    ratingsElements.map((element: any) => {
      ratings.map((value: any) => {
        if (element.value === value) element.checked = true;
      });
    });
  }, [ratings]); // cache, query, mark as checked
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
