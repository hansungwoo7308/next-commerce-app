import ProductDetailWidget from "@/components/product/ProductDetailWidget";
import ProductReviewImageSlider from "@/components/product/ProductReviewImageSlider";
import Stars from "@/components/product/Stars";
import { styled } from "styled-components";
import { FaCircleUser } from "react-icons/fa6";
import { setModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "lib/public/fetchData";

const data: any = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ProductDetail({ product }: any) {
  const { ratings, reviews } = product;
  console.log({ product });
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store: any) => store.auth);

  const handleClickWriteReview = () => {
    // const modalAction = async () => {
    //   // update the product's reviews property
    // };
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT_REVIEW", id: product._id }));
  };

  return (
    <Box>
      <div className="product-detail">
        {/* <ProductDetailWidget product={product} /> */}
        {/* <div className="middle">
          <div className="product-description">
            <h1>Product Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem voluptatibus
              velit quis labore consequatur maxime commodi ducimus, blanditiis pariatur, fugit iusto
              eum atque inventore tenetur repellendus nesciunt praesentium illum.
            </p>
          </div>
          <div className="product-detail">
            <h1>Product Detail</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem voluptatibus
              velit quis labore consequatur maxime commodi ducimus, blanditiis pariatur, fugit iusto
              eum atque inventore tenetur repellendus nesciunt praesentium illum.
            </p>
          </div>
        </div> */}
        <div className="bottom">
          <div className="bottom-left">
            <h1>Customer Reviews</h1>
            <div className="reviews-ratings">
              <p>{ratings ? ratings + ".0" : ratings}</p>
              <Stars number={ratings} />
              <p>{"( " + reviews.length + " )"}</p>
            </div>
            <div className="write-a-review">
              <h3>Do you want to review this product?</h3>
              <button onClick={handleClickWriteReview}>Write a review</button>
            </div>
          </div>
          <div className="bottom-right">
            <div className="reviews-with-images">
              <h1>Reviews with images</h1>
              <ProductReviewImageSlider data={data} displayCount={3} />
            </div>
            <hr />
            <ul className="reviews">
              <h1>Reviews</h1>
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
      </div>
    </Box>
  );
}

const Box = styled.div`
  > .product-detail {
    /* border: 2px solid green; */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > * {
      border: 2px solid;
      border-radius: 10px;
      padding: 1rem;
      background-color: #333;
    }
    > .middle {
    }
    > .bottom {
      display: flex;
      > * {
        border: 1px solid;
        padding: 1rem;
      }
      > .bottom-left {
        flex: 0.3;
        border: 1px solid;
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
  }
  img {
    cursor: pointer;
  }
  button {
    background-color: #777;
    padding: 1rem;
  }
`;
