import SlickSlider from "@/components/performance/SlickSlider";
import ProductReviews from "@/components/product/ProductReviews";
import Stars from "@/components/product/Stars";
import { setModal } from "lib/client/store/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function ProductDetailReviews({ product }: any) {
  // external
  const { reviews } = product;
  const { user } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  // internal
  const [reviewRatingsAverage, setReviewRatingsAverage]: any = useState();

  const items = product.reviews
    ?.filter((review: any) => review.images.length !== 0)
    .map((review: any) => ({
      id: review._id,
      url: review.images[0]?.url,
      text: review.name,
    }));
  // 내림차순 정렬
  const sortedItems = items.sort((a: any, b: any) => items.indexOf(b) - items.indexOf(a));

  const handleWriteReview = () => {
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT_REVIEW", id: product._id }));
  };

  useEffect(() => {
    const reviewRatingsAverage =
      reviews.reduce((a: any, v: any) => a + v.rating, 0) / reviews.length;
    // console.log({ reviewRatingsAverage });
    setReviewRatingsAverage(reviewRatingsAverage);
  }, [reviews]);

  return (
    <Box className="product-detail-reviews">
      <div className="reviews-info">
        <h1>Customer Reviews</h1>
        <div className="reviews-ratings">
          {reviews.length && reviewRatingsAverage ? (
            <>
              <p>{reviewRatingsAverage?.toFixed(1)}</p>
              <Stars number={Math.round(reviewRatingsAverage)} />
              <p>{"( " + reviews.length + " )"}</p>
            </>
          ) : (
            <p>No reviews</p>
          )}
        </div>
        <hr />
        {user?.role === "user" && (
          <div className="write-a-review">
            <p>You can write this product&apos;s review</p>
            <button className="create-button" onClick={handleWriteReview}>
              Write a review
            </button>
          </div>
        )}
      </div>
      <div className="reviews-outer">
        <div className="reviews-with-images">
          <h1>Reviews with images</h1>
          <SlickSlider
            items={sortedItems}
            itemSize={{
              width: 300,
              height: 200,
            }}
            settings={{
              slidesToShow: 3,
              slidesToScroll: 3,
            }}
            actionType="VIEW_IMAGE"
          />
        </div>
        <hr />
        <h1>Reviews</h1>
        <ProductReviews product={product} reviews={reviews} />
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  /* border: 1px solid red; */

  > * {
    border: 1px solid green;
    /* padding: 1rem; */
  }

  .reviews-info {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .reviews-ratings {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .reviews-outer {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .slick-track {
    .slick-slide {
      padding: 0 0.5rem;
    }
  }
`;
