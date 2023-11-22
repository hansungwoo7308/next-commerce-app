import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Stars from "@/components/product/Stars";
import { mutate } from "swr";

const categories = ["all", "electronics", "furnitures", "cosmetics", "fashion"];

export default function Filters2() {
  const router = useRouter();
  const [ratings, setRatings]: any = useState([]);
  const [isCacheLoaded, setIsCacheLoaded]: any = useState(false);

  const handleCategoryChange = (category: any) => {
    router.query = { ...router.query, category: category, page: "1" };
    mutate("/api/v2/products");
  };

  const handleRatingChange = (rating: any) => {
    const updatedRatings = ratings.includes(rating)
      ? // remove the rating
        ratings.filter((r: any) => r !== rating)
      : // add the rating
        [...ratings, rating];
    setRatings(updatedRatings);
  };

  // get the cache data and set the state

  useEffect(() => {
    const stringfiedRatings: any = localStorage.getItem("ratings");
    const parsedRatings = JSON.parse(stringfiedRatings);

    // 캐시된 레이팅이 없으면
    if (!parsedRatings?.length) {
      setRatings([]);
      setIsCacheLoaded(true);
      return;
    }

    // 캐시된 레이팅이 있으면
    setRatings(parsedRatings);
    setIsCacheLoaded(true);
  }, []);

  useEffect(() => {
    // 초기로드시에는 패스한다.
    if (!isCacheLoaded) return;

    // 레이팅 없으면 제거
    if (!ratings?.length) {
      localStorage.removeItem("ratings");
      delete router.query.ratings;
      router.push({ pathname: router.pathname, query: router.query });
      return;
    }

    // 레이팅 있으면 추가
    console.log("testing...");
    localStorage.setItem("ratings", JSON.stringify(ratings));
    const serializedRatings = ratings.join("+");
    const updatedQuery = { ...router.query, ratings: serializedRatings };
    router.push({ pathname: router.pathname, query: updatedQuery });
  }, [ratings]);

  return (
    <Box className="filters">
      <div className="category">
        <h4>Category</h4>
        <ul>
          {categories.map((category: any) => (
            <li key={category}>
              <label>
                {category === "all" ? (
                  <input
                    type="radio"
                    name="category"
                    checked={
                      router.query.category === "all" || router.query.category === undefined
                        ? true
                        : false
                    }
                    onChange={() => handleCategoryChange(category)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="category"
                    checked={router.query.category === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                )}

                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            </li>
          ))}
        </ul>
        {/* <ul>
          <li>
            <label>
              <input
                ref={allRef}
                type="radio"
                name="category"
                value="all"
                onChange={handleCategoryChange}
                checked={
                  router.query.category === "all" || router.query.category === undefined
                    ? true
                    : false
                }
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
                onChange={handleCategoryChange}
                checked={router.query.category === "electronics"}
              />
              <span>Electronics</span>
            </label>
          </li>
          <li>
            <label>
              <input
                ref={furnituresRef}
                type="radio"
                name="category"
                value="furnitures"
                onChange={handleCategoryChange}
                checked={router.query.category === "furnitures"}
              />
              <span>Furnitures</span>
            </label>
          </li>
          <li>
            <label>
              <input
                ref={cosmeticsRef}
                type="radio"
                name="category"
                value="cosmetics"
                onChange={handleCategoryChange}
              />
              <span>Cosmetics</span>
            </label>
          </li>
          <li>
            <label>
              <input
                ref={fashionRef}
                type="radio"
                name="category"
                value="fashion"
                onChange={handleCategoryChange}
              />
              <span>Fashion</span>
            </label>
          </li>
        </ul> */}
      </div>
      <div className="ratings-filter">
        <h4>Customer Reviews</h4>
        <ul>
          {[1, 2, 3, 4, 5]
            .sort((a, b) => b - a)
            .map((rating: any) => (
              <li key={rating} className="rating">
                <label>
                  <input
                    type="checkbox"
                    name="rating"
                    value={rating}
                    checked={ratings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <Stars number={rating} />
                </label>
              </li>
            ))}
          {/* {ratingsData.map((rating: any,index:any) => (
            <li key={index+1}>
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
          ))} */}
        </ul>
      </div>
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
      > li {
        > label {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
  }
  .rating {
    > label {
      display: flex;
      gap: 0.5rem;
    }
  }
  label:hover {
    cursor: pointer;
    filter: grayscale();
    color: gray;
  }
`;
