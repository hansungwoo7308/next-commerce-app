import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { IoStar } from "react-icons/io5";
// set the dataset with ratings icons
let ratingsData: any = [];
for (let i = 0; i < 5; i++) {
  let icons = [];
  for (let j = 0; j <= i; j++) icons.push(<IoStar color="#C7511F" />);
  ratingsData.push({ icons });
}
export default function Filters() {
  const router = useRouter();
  // category
  const allRef: any = useRef();
  const electronicsRef: any = useRef();
  const foodRef: any = useRef();
  const [categoryElements, setCategoryElements]: any = useState([]);
  // ratings
  const [ratings, setRatings]: any = useState([]);
  const [ratingsElements, setRatingsElements]: any = useState([]);
  const handleClickCategory = (e: any) => {
    const { name, value } = e.target;
    router.query = { ...router.query, [name]: value };
    console.log({ router });
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

  // origin data : localStorage
  // 로컬스토리지를 기준으로 데이터가 스토리지에 존재하면 스테이트를 채운다.
  // 스테이트가 변경시, 로컬스테이트를 업데이트한다.
  // 스테이크가 변경시, 쿼리를 추가하여 라우팅한다.

  // initialize
  useEffect(() => {
    setCategoryElements([allRef.current, electronicsRef.current, foodRef.current]);

    const ratingsElements: any = Array.from(document.querySelectorAll(".ratings-filter .ratings"));
    console.log({ ratingsElements });
    setRatingsElements(ratingsElements);

    // 카테고리 쿼리가 없으면, 카테고리 all에 체크한다.
    if (!router.query.category) allRef.current.checked = true;
  }, []);

  // 초기에 실행, category input check하면 실행
  useEffect(() => {
    // categoryElements로부터 쿼리와 일치하는 해당항목에 체크한다.
    categoryElements.map((element: any) => {
      if (element.value === router.query.category) element.checked = true;
    });
  }, [categoryElements]);

  useEffect(() => {
    // 캐싱된 데이터로 채운다.
    const localStorageRatings = localStorage.getItem("ratings");
    if (!localStorageRatings) return;
    const ratingsToReload = localStorageRatings.split("+");
    setRatings(ratingsToReload);

    // // 캐싱된 데이터로 조회한다.
    // router.query = { ...router.query, ratings: localStorageRatings };
    // router.push({ pathname: router.pathname, query: router.query });
  }, [router.asPath]); // waterfall from localStorage, query

  useEffect(() => {
    console.log({ ratings });
    // 변경된 레이팅을 캐싱한다. 레이팅으로 조회한다. 인풋 엘리먼트를 체크표시한다.
    // exception
    // ratings가 없으면 로컬스토리지와 라우터쿼리에 저장된 데이터를 삭제한다.
    // if (!ratings.length) {
    //   localStorage.removeItem("ratings");
    //   delete router.query.ratings;
    //   router.push({ pathname: router.pathname, query: router.query });
    //   return;
    // }

    // cache
    // stringify the ratings (array > string)
    const stringfiedRatings = ratings.reduce((a: any, v: any, i: any) => {
      if (i === 0) return v;
      return a + "+" + v;
    }, "");
    localStorage.setItem("ratings", stringfiedRatings);
    // console.log({ stringfiedRatings });

    // query
    router.query = { ...router.query, ratings: stringfiedRatings };
    router.push({ pathname: router.pathname, query: router.query });
  }, [ratings]); // cache, query, mark as checked

  useEffect(() => {
    // mark as checked
    // ratings.map((v: any) => {
    //   ratingsElements.map((v2: any) => {
    //     console.log({ v2 });
    //     // if(v2.)
    //   });
    // });
    // ratingsElements.map((element: any) => {
    //   console.log({ element });
    //   ratings.map((value: any) => {
    //     console.log({ value });
    //     if (element?.value === value) element.checked = true;
    //     else element.checked = false;
    //   });
    // });
    console.log({ ratingsElements });
    if (!ratings.length) {
      ratingsElements.map((element: any) => {
        element.checked = false;
      });
      return;
    }
    ratingsElements.map((element: any) => {
      // console.log({ element });
      ratings.map((value: any) => {
        // console.log({ value });
        if (element?.value === value) element.checked = true;
        // else element.checked = false;
      });
    });
  }, [ratings]);

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
      <div className="ratings-filter">
        <h4>Customer Reviews</h4>
        <ul>
          {ratingsData.map((rating: any) => (
            <li>
              <label>
                <input
                  className="ratings"
                  type="checkbox"
                  name="ratings"
                  value={rating.icons.length}
                  onClick={handleClickRatings}
                />
                {rating.icons.map((icon: any) => icon)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button className="clear-button" onClick={() => setRatings([])}>
        Clear ratings
        <br />
        (localStorage)
        <br />
        (localState:component)
      </button>
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
  .clear-button {
    &:hover {
      color: #fff;
    }
  }
`;
