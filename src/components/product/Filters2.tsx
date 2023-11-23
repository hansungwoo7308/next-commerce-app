import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Stars from "@/components/product/Stars";
import { mutate } from "swr";

const categories = ["all", "electronics", "furnitures", "cosmetics", "fashion"];

export default function Filters2() {
  const router = useRouter();
  const [ratings, setRatings]: any = useState([]);
  // const [isCacheLoaded, setIsCacheLoaded]: any = useState(false);

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
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));

    console.log({ updatedRatings });
    // router.query.ratings = "updatedRatings";
    router.query.ratings = updatedRatings.join("+");
    // router.query = { ...router.query, ratings: [...updatedRatings] };
    mutate("/api/v2/products");
  };

  useEffect(() => {
    const ratings: any = localStorage.getItem("ratings");

    if (!ratings) setRatings([]);
    else setRatings(JSON.parse(ratings));

    // setIsCacheLoaded(true);
  }, []);

  useEffect(() => {
    console.log({ ratings });

    // if (!isCacheLoaded) return;

    if (!ratings) localStorage.removeItem("ratings");
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
                    // value={rating}
                    checked={ratings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {/* <Stars number={rating} /> */}
                  <p>
                    {rating - 1}-{rating}
                  </p>
                </label>
              </li>
            ))}
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
