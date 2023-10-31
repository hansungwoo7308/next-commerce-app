import ProductDetailWidget from "@/components/product/ProductDetailWidget";
import ProductReviewImageSlider from "@/components/product/ProductReviewImageSlider";
import Stars from "@/components/product/Stars";
import SlickSlider from "@/components/performance/SlickSlider";
import ProductReviews from "@/components/product/ProductReviews";
import { FaCircleUser } from "react-icons/fa6";
import { setModal } from "lib/client/store/modalSlice";
import { postData } from "lib/public/fetchData";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { styled } from "styled-components";
import ProductMangerFixed from "@/components/product/ProductMangerFixed";
import { useEffect, useState } from "react";

export default function ProductDetail({ product }: any) {
  // external
  const { ratings, reviews } = product;
  const { user } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  // internal
  const [reviewRatingsAverage, setReviewRatingsAverage]: any = useState();

  const items = product.reviews
    ?.filter((review: any) => review.images.length !== 0)
    .map((review: any) => ({
      _id: review._id,
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
    console.log({ reviewRatingsAverage });
    setReviewRatingsAverage(reviewRatingsAverage);
    // const reviewRatingsAverage =
    //   reviews.reduce((a: any, v: any) => a.rating + v.rating, 0) / reviews.length;
    // console.log({ reviewRatingsAverage });
    // setReviewRatingsAverage(reviewRatingsAverage);
  }, [reviews]);

  return (
    <Box className="product-detail">
      <div className="top">
        <ProductDetailWidget product={product} />
      </div>
      {/* <div className="middle">
        <div className="product-description">
          <h1>Product Description</h1>
          <pre>{product.description}</pre>
        </div>
        <div className="product-detail">
          <h1>Product Detail</h1>
          <ul>
            {product.images.map((image: any, index: number) => (
              <li key={index}>
                <Image src={image.url} width={700} height={700} alt="alt" />
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <div className="bottom">
        <div className="bottom-left">
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
              <p>You can write this product's review</p>
              <button className="create-button" onClick={handleWriteReview}>
                Write a review
              </button>
            </div>
          )}
        </div>
        <div className="bottom-right">
          <div className="reviews-with-images">
            <h1>Reviews with images</h1>
            <SlickSlider items={sortedItems} multipleItemNumber={3} actionType="VIEW_IMAGE" />
            {/* <SlickSlider items={items} multipleItemNumber={3} actionType="VIEW_IMAGE" /> */}
            {/* <SlickSlider items={[product]} multipleItemNumber={3} actionType="VIEW_IMAGE" /> */}
          </div>
          <hr />
          <h1>Reviews</h1>
          <ProductReviews product={product} reviews={reviews} />
        </div>
      </div>
      <ProductMangerFixed />
    </Box>
  );
}

const Box = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 2px solid green; */

  /* public */
  pre {
    white-space: pre-wrap;
  }

  /* children */
  > * {
    border: 1px solid;
    border-radius: 10px;
    padding: 1rem;
    background-color: #333;
  }
  > .top {
  }
  > .middle {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    h1 {
      margin-bottom: 1rem;
    }
  }
  > .bottom {
    display: flex;
    gap: 3rem;
    > * {
      /* border: 1px solid; */
      padding: 1rem;
    }
    > .bottom-left {
      width: 30%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > .reviews-ratings {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
    > .bottom-right {
      width: 70%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  .slick-track {
    /* display: flex;
    gap: 1rem; */
    .slick-slide {
      padding: 0 0.5rem;
    }
  }
`;
