import { setModal } from "lib/client/store/modalSlice";
import { postData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function CreateProductReviewForm() {
  const auth = useSelector((store: any) => store.auth);
  const modal = useSelector((store: any) => store.modal);
  const { active, type, message, id, ids, modalAction, actionLabel, disabled } = modal;
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleClickCreateProductReview = async (data: any) => {
    // console.log({ ...data, User: auth.user._id });
    const review = {
      ...data,
      User: auth.user._id,
    };
    const response = await postData(`v2/products/${id}/review`, { review }, auth.accessToken);
    console.log({ response });
    router.push({ pathname: router.asPath });
    // console.log(first)
  };
  const handleClose = () => dispatch(setModal({ active: false }));

  return (
    <Box className="CREATE_PRODUCT_REVIEW">
      <div className="top">
        <h3>{type}</h3>
        <hr />
      </div>
      <div className="middle">
        <div className="rating">
          <select {...register("rating", { required: true })}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div className="title">
          <input {...register("title", { required: true })} type="text" placeholder="Title" />
        </div>
        <div className="comment">
          <textarea
            {...register("comment", { required: true })}
            name="comment"
            id="comment"
            cols={30}
            rows={10}
            placeholder="Comment"
          />
        </div>
        <div className="images">
          <input {...register("images")} type="image" />
        </div>
      </div>
      <div className="bottom">
        <button
          onClick={handleSubmit(handleClickCreateProductReview)}
          // onClick={handleAction}
          // disabled={loading}
        >
          {actionLabel || "Confirm"}
        </button>
        <button onClick={handleClose}>Close</button>
      </div>
    </Box>
  );
}
const Box = styled.form``;
