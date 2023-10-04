import ProductDetailWidget from "@/components/product/ProductDetailWidget";
import ProductReviewImageSlider from "@/components/product/ProductReviewImageSlider";
import Stars from "@/components/product/Stars";
import { styled } from "styled-components";
import { FaCircleUser } from "react-icons/fa6";
import { setModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "lib/public/fetchData";
import Image from "next/image";

const data: any = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ProductDetail({ product }: any) {
  const { ratings, reviews } = product;
  console.log({ product });
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store: any) => store.auth);

  const handleWriteReview = () => {
    // const modalAction = async () => {
    //   // update the product's reviews property
    // };
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT_REVIEW", id: product._id }));
  };

  return (
    <Box className="product-detail">
      {/* <div className="top">
        <ProductDetailWidget product={product} />
      </div> */}
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
            {ratings ? (
              <>
                <p>{ratings + ".0"}</p>
                <Stars number={ratings} />
                <p>{"( " + reviews.length + " )"}</p>
              </>
            ) : (
              <p>No reviews</p>
            )}
          </div>
          <div className="write-a-review">
            <h3>Do you want to review this product?</h3>
            <button onClick={handleWriteReview}>Write a review</button>
          </div>
        </div>
        <div className="bottom-right">
          <div className="reviews-with-images">
            <h1>Reviews with images</h1>
            <ProductReviewImageSlider data={product.images} displayCount={3} />
            {/* <ProductReviewImageSlider data={data} displayCount={3} /> */}
          </div>
          <hr />
          <h1>Reviews</h1>
          <ul className="reviews">
            {reviews.map((review: any) => (
              <li className="review" key={review._id}>
                <div className="review-top">
                  <div className="user-profile">
                    <FaCircleUser />
                    <p>Username</p>
                  </div>
                  <div className="review-ratings">
                    <Stars number={review.rating} />
                  </div>
                </div>
                <div className="review-middle">
                  <div className="comment">
                    <h4>review id : {review._id}</h4>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <h1>Customers frequently viewed</h1> */}
        </div>
      </div>
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
  button {
    background-color: #777;
    padding: 1rem;
  }
  pre {
    white-space: pre-wrap;
  }

  /* children */
  > * {
    border: 2px solid;
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
      flex: 0.3;
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
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > .reviews {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        > .review {
          border: 1px solid;
          border-radius: 5px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          > .review-top {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            > .user-profile {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
          }
        }
      }
    }
  }
`;
