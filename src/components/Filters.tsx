import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { IoStar } from "react-icons/io5";
export default function Filters() {
  const router = useRouter();
  // category
  const allRef: any = useRef();
  const electronicsRef: any = useRef();
  const foodRef: any = useRef();
  const [categoryElements, setCategoryElements]: any = useState([]);
  // ratings
  const ratings5StarRef: any = useRef();
  const ratings4StarRef: any = useRef();
  const ratings3StarRef: any = useRef();
  const ratings2StarRef: any = useRef();
  const ratings1StarRef: any = useRef();
  const [ratings, setRatings]: any = useState([]);
  const [ratingsElements, setRatingsElements]: any = useState([]);
  const ratingsDataset = [
    {
      ratings5StarRef,
      value: 5,
      icons: [<IoStar />, <IoStar />, <IoStar />, <IoStar />, <IoStar />],
    },
    {
      ratings5StarRef,
      value: 4,
      icons: [<IoStar />, <IoStar />, <IoStar />, <IoStar />],
    },
    {
      ratings5StarRef,
      value: 3,
      icons: [<IoStar />, <IoStar />, <IoStar />],
    },
    {
      ratings5StarRef,
      value: 2,
      icons: [<IoStar />, <IoStar />],
    },
    {
      ratings5StarRef,
      value: 1,
      icons: [<IoStar />],
    },
  ];
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
      ratings5StarRef.current,
      ratings4StarRef.current,
      ratings3StarRef.current,
      ratings2StarRef.current,
      ratings1StarRef.current,
    ]);
    // 카테고리 쿼리가 없으면, 카테고리 all에 체크한다.
    if (!router.query.category) allRef.current.checked = true;
  }, []); // initialize
  useEffect(() => {
    categoryElements.map((element: any) => {
      if (element.value === router.query.category) element.checked = true;
    });
  }, [categoryElements]); // categoryElements로부터 쿼리와 일치하는 해당항목에 체크한다.
  useEffect(() => {
    // 캐싱된 데이터로 채운다.
    const localStorageRatings = localStorage.getItem("ratings"); // string
    if (!localStorageRatings) return;
    setRatings(localStorageRatings.split("+"));
    // 캐싱된 데이터로 조회한다.
    router.query = { ...router.query, ratings: localStorageRatings };
    router.push({ pathname: router.pathname, query: router.query });
  }, [router.asPath]); // waterfall from localStorage, query
  useEffect(() => {
    // 변경된 레이팅을 캐싱한다. 레이팅으로 조회한다. 인풋 엘리먼트를 체크표시한다.
    // exception
    // ratings가 없으면 로컬스토리지와 라우터쿼리에 저장된 데이터를 삭제한다.
    if (!ratings.length) {
      localStorage.removeItem("ratings");
      delete router.query.ratings;
      router.push({ pathname: router.pathname, query: router.query });
      return;
    }

    // log
    // console.log({ ratings });

    // cache
    // save to localStorage
    // stringify the ratings (array > string)
    const stringfiedRatings = ratings.reduce((a: any, v: any, i: any) => {
      if (i === 0) return v;
      return a + "+" + v;
    }, "");
    // set the localStorage
    localStorage.setItem("ratings", stringfiedRatings);
    // console.log({ stringfiedRatings });

    // query
    router.query = { ...router.query, ratings: stringfiedRatings };
    router.push({ pathname: router.pathname, query: router.query });

    // mark as checked
    ratingsElements.map((element: any) => {
      ratings.map((value: any) => {
        if (element?.value === value) element.checked = true;
      });
    });
  }, [ratings]); // cache, query, mark as checked
  // }, [ratings, router.asPath]); // cache, query, mark as checked
  return (
    <Box className="filters">
      <div className="category">
        <h4>Category</h4>
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
        <h4>Customer Reviews</h4>
        <ul>
          {ratingsDataset.map((rating: any) => (
            <li>
              <label>
                <input
                  type="checkbox"
                  name="ratings"
                  value={rating.value}
                  onClick={handleClickRatings}
                />
                {rating.icons.map((icon: any) => icon)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* <h3>RaringsValues : {JSON.stringify(ratings)}</h3> */}
    </Box>
  );
}
const Box = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid;
  border-radius: 10px;
  padding: 1rem;
  background-color: #333;
  > div {
    /* border: 2px solid; */
    > ul {
      margin-top: 0.5rem;
    }
  }
`;
