import Stars from "@/components/product/Stars";
import { addId, removeId } from "lib/client/store/productManagerSlice";
import { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

interface Props {
  review?: any;
}

export default function ProductReview({ review }: Props) {
  const { user } = useSelector((store: any) => store.auth);
  const checkboxRef: any = useRef(null);
  const [isCheck, setIsCheck]: any = useState();
  const { ids } = useSelector((store: any) => store.productManager);

  const dispatch = useDispatch();

  useEffect(() => {
    if (checkboxRef.current === null) return;
    console.log({ isCheck });
    if (isCheck) {
      checkboxRef.current.classList.add("active");
      dispatch(addId(review._id));
    } else {
      checkboxRef.current.classList.remove("active");
      dispatch(removeId(review._id));
    }
  }, [isCheck]);

  return (
    <Box className="review" key={review._id}>
      <div className="review-left">
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
      <div className="review-right">
        <h1>review image</h1>
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
  border: 1px solid;
  border-radius: 5px;
  /* padding: 1rem; */
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  &:hover .checkbox-outer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > * {
    /* border: 1px solid green; */
  }
  > .review-left {
    flex: 1;
    padding: 1rem;
    display: flex;
    gap: 1rem;
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
  > .review-right {
    /* min */
    width: 10rem;
    height: 10rem;
    background-color: gray;
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