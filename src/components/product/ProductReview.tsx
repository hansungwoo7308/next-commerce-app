import Stars from "@/components/product/Stars";
import { setModal } from "lib/client/store/modalSlice";
import { setProductId, setReviewId, setReviewIds } from "lib/client/store/productManagerSlice";
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
  const { reviewIds } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();

  // internal
  const checkboxRef: any = useRef(null);
  const [isCheck, setIsCheck]: any = useState();

  const handleSelectReview = () => setIsCheck(!isCheck);

  useEffect(() => {
    if (!checkboxRef.current) return;

    if (isCheck) {
      checkboxRef.current.classList.add("active");

      // 체크시, 하나도 추가하지 않은 경우만 제품아이디를 추가
      if (reviewIds.length === 0) dispatch(setProductId(product._id));

      dispatch(setReviewIds([...reviewIds, review._id]));
    } else {
      checkboxRef.current.classList.remove("active");

      // 체크시, 마지막 하나 남은 경우만 제품아이디을 제거
      if (reviewIds.length === 1) dispatch(setProductId(null));

      dispatch(setReviewIds(reviewIds.filter((reviewId: any) => reviewId !== review._id)));
    }
  }, [isCheck, dispatch]);

  // console.log({ review });

  if (review.length === 0) return null;
  return (
    <Box
      className="product-review"
      onClick={() => {
        if (user?.role !== "admin")
          dispatch(setModal({ active: true, type: "VIEW_REVIEW", review }));
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
        {review.images.length ? (
          <Image src={review.images[0]?.url} alt="alt" width={200} height={200} />
        ) : null}
      </div>
      {user?.role === "admin" && (
        <div className="checkbox-outer" ref={checkboxRef} onClick={handleSelectReview}>
          {isCheck ? <h1>Selected</h1> : <h1>Select this item</h1>}
        </div>
      )}
    </Box>
  );
}

const Box = styled.li`
  min-height: 10rem;
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
    /* height: 10rem; */
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
