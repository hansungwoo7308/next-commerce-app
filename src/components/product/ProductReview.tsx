import Stars from "@/components/product/Stars";
import { setModal } from "lib/client/store/modalSlice";
import {
  addProductReviewId,
  removeProductReviewId,
  setSelectedProductId,
} from "lib/client/store/productManagerSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

interface Props {
  product?: any;
  review: any;
}

export default function ProductReview({ product, review }: Props) {
  // exteranl
  const { user } = useSelector((store: any) => store.auth);
  const { selectedProductId, selectedProductReviewIds } = useSelector(
    (store: any) => store.productManager
  );
  const dispatch = useDispatch();
  // internal
  const checkboxRef: any = useRef(null);
  const [isCheck, setIsCheck]: any = useState();

  useEffect(() => {
    if (checkboxRef.current === null) return;
    // console.log({ isCheck });
    if (isCheck) {
      checkboxRef.current.classList.add("active");
      dispatch(addProductReviewId(review._id));
    } else {
      checkboxRef.current.classList.remove("active");
      dispatch(removeProductReviewId(review._id));
    }
  }, [isCheck]);

  // console.log({ review });

  if (review.length === 0) return null;
  return (
    <Box
      className="review"
      onClick={() => {
        if (user?.role !== "admin") dispatch(setModal({ active: true, type: "REVIEW", review }));
      }}
    >
      <div className="review-content">
        <div className="review-user">
          <FaCircleUser />
        </div>
        <div className="review-info">
          <div className="review-ratings">
            <Stars number={review.rating} />
          </div>
          <div className="review-user-id">
            <small>User***</small>
          </div>
          <div className="review-comment">
            <h4>review id : {review._id}</h4>
            <p>{review.comment}</p>
          </div>
        </div>
      </div>
      <div className="review-image">
        {review.images.length > 0 && (
          <Image src={review.images[0]?.url} alt="alt" width={200} height={200} />
        )}
      </div>
      {user?.role === "admin" && (
        <div
          className="checkbox-outer"
          ref={checkboxRef}
          onClick={() => setIsCheck((state: any) => !state)}
        >
          {isCheck ? <h1>Selected</h1> : <h1>Select this item</h1>}
        </div>
      )}
    </Box>
  );
}

const Box = styled.li`
  height: 10rem;
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover .checkbox-outer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > * {
    /* border: 1px solid green; */
  }
  > .review-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    word-break: break-all;
    > .review-user {
      font-size: 30px;
    }
    > .review-info {
      > .review-ratings {
        font-size: small;
      }
      > .review-comment {
        margin-top: 1rem;
      }
    }
  }
  > .review-image {
    width: 10rem;
    height: 10rem;
  }
  > .checkbox-outer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    cursor: pointer;
    h1 {
      pointer-events: none;
    }
  }

  .active {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid red;
  }
`;
