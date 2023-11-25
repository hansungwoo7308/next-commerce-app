import logResponse from "lib/client/log/logResponse";
import { deleteItemFromCart } from "lib/client/store/cartSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { setModal } from "lib/client/store/modalSlice";
import { deleteData, postData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import styled from "styled-components";
import CreateProductForm from "@/components/form/CreateProductForm";
import CreateProductReviewForm from "@/components/form/CreateProductReviewForm";
import ProductReview from "@/components/product/ProductReview";
import Stars from "@/components/product/Stars";
import { useSession } from "next-auth/react";
// import { deleteItemFromCart } from "lib/client/store/cartSlice";
// import { deleteUser } from "lib/client/store/usersSlice";
// import { deleteData, getData, postData } from "lib/client/utils/fetchData";

export default function Modal() {
  // external
  const dispatch = useDispatch();
  const session = useSession();
  const { accessToken } = useSelector((store: any) => store.auth);
  const { active, type, id, ids, message, modalAction, modalActionLabel, disabled, src, review } =
    useSelector((store: any) => store.modal);
  const { productId, reviewIds } = useSelector((store: any) => store.productManager);

  const handleClose = () => dispatch(setModal({ active: false }));

  // internal
  const router = useRouter();

  if (!active) return null;
  if (type === "VIEW_IMAGE") {
    return (
      <Background onClick={handleClose}>
        <Box className="view-image" onClick={(e) => e.stopPropagation()}>
          <Image src={src} alt="alt" width={500} height={500} />
        </Box>
      </Background>
    );
  }
  if (type === "VIEW_REVIEW") {
    return (
      <Background onClick={handleClose}>
        <Box onClick={(e) => e.stopPropagation()}>
          <div className="review">
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
            {review.images.length > 0 && (
              <div className="review-image">
                <Image src={review.images[0]?.url} alt="alt" width={500} height={500} />
              </div>
            )}
          </div>
        </Box>
      </Background>
    );
  }
  if (type === "CREATE_PRODUCT") {
    return (
      <Background onClick={handleClose}>
        <Box style={{ borderColor: "#00aaff" }} onClick={(e) => e.stopPropagation()}>
          <CreateProductForm />
        </Box>
      </Background>
    );
  }
  if (type === "CREATE_PRODUCT_REVIEW") {
    return (
      <Background onClick={handleClose}>
        <Box style={{ borderColor: "#00aaff" }} onClick={(e) => e.stopPropagation()}>
          <CreateProductReviewForm />
        </Box>
      </Background>
    );
  }
  if (type === "DELETE_ITEM") {
    return (
      <Background onClick={handleClose}>
        <Box onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <h1>DELETE_ITEM</h1>
          </div>
          <div className="middle">
            <p>Do you want to delete this item?</p>
          </div>
          <div className="bottom">
            <button
              className="delete-button"
              onClick={async () => {
                modalAction();
                dispatch(setModal({ active: false }));
              }}
            >
              Delete
            </button>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Background>
    );
  }
  if (type === "DELETE_ITEMS") {
    return (
      <Background onClick={handleClose}>
        <Box onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <h1>DELETE_ITEMS</h1>
          </div>
          <div className="middle">
            <p>Do you want to delete this items?</p>
          </div>
          <div className="bottom">
            <button className="delete-button" onClick={async () => {}}>
              Delete
            </button>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Background>
    );
  }
  if (type === "DELETE_PRODUCT_REVIEWS") {
    const handleDeleteItems = async () => {
      console.log({ productId, reviewIds });
      // return;

      try {
        const response = await deleteData(
          `v2/products/${productId}/review`,
          { reviewIds },
          accessToken
        );
        logResponse(response);
        router.push({ pathname: router.asPath });
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    return (
      <Background onClick={handleClose}>
        <Box onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <h1>DELETE_ITEMS</h1>
          </div>
          <div className="middle">
            <p>Do you want to delete this items?</p>
          </div>
          <div className="bottom">
            <button className="delete-button" onClick={handleDeleteItems}>
              Delete
            </button>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Background>
    );
  }
  if (type === "DELETE_PRODUCT") {
    return (
      <Background onClick={handleClose}>
        <Box onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <h1>DELETE_PRODUCT</h1>
          </div>
          <div className="middle">
            <p>Do you want to delete this product?</p>
          </div>
          <div className="bottom">
            <button
              className="delete-button"
              onClick={async () => {
                console.log({ id });
                return;
                const response = await deleteData(`v2/products/${id}`, null, accessToken);
                logResponse(response);
                router.push({ pathname: router.pathname });
              }}
            >
              Delete
            </button>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Background>
    );
  }
  if (type === "DELETE_PRODUCTS") {
    return (
      <Background onClick={handleClose}>
        <Box onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <h1>DELETE_PRODUCTS</h1>
          </div>
          <div className="middle">
            <p>Do you want to delete these products?</p>
          </div>
          <div className="bottom">
            <button
              className="delete-button"
              onClick={async () => {
                return;

                const response = await deleteData(`v2/products/${id}`, ids, accessToken);
                logResponse(response);
                router.push({ pathname: router.asPath });
              }}
            >
              Delete
            </button>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Background>
    );
  }
  return (
    <Background onClick={handleClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h3>{type || "MODAL"}</h3>
        </div>
        <hr />
        <div className="main">
          <p>{message}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => modalAction()}
            // disabled={loading}
          >
            {modalActionLabel || "Confirm"}
          </button>
          <button onClick={handleClose}>Close</button>
        </div>
      </Box>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .view-image {
    width: 70vw;
    height: 70vh;
  }
`;

const Box = styled.div`
  background-color: #eee;
  color: #000;
  border: 5px solid;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* animation: pop 0.3s;
  @keyframes pop {
    0% {
      display: none;
      opacity: 0;
      transform: translateY(10rem);
    }
    100% {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
  } */

  > .top {
    > hr {
      border-top: 1px solid;
    }
  }
  > .middle {
    flex: 1;
  }
  > .bottom {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    > .delete-button,
    > .cancel-button,
    > .close-button {
      padding: 1rem;
      border-radius: 5px;
    }
  }

  /* review */
  .review {
    /* height 100% */
    max-height: 700px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .review-content {
      display: flex;
      gap: 1rem;
    }
    .review-image {
      img {
      }
    }
  }

  @media (max-width: 500px), (width <= 500px) {
    width: 90vw;
  }
`;
// const handleDeleteUser = async () => {
//   // delete
//   const response = await deleteData(`user/${id}`, auth.accessToken);
//   const { _id } = response.data.deletedUser;
//   // out
//   logResponse(response);
//   dispatch(deleteUser({ _id }));
// };
// const handleDeleteProduct = async () => {
//   // delete
//   const response = await deleteData(`product/${id}`, auth.accessToken);
//   // const { _id } = response.data.deletedProduct;
//   // out
//   logResponse(response);
//   // dispatch(deleteUser({ _id }));
// };
// const handleDeleteProducts = async () => {
//   try {
//     const response = await deleteData("product", auth.accessToken, { ids });
//     const { deletedProducts } = response.data;
//     logResponse(response);
//   } catch (error) {
//     logError(error);
//   }
// };
// const handleDeleteBucket = async () => {
//   dispatch(deleteItemFromCart({ _id: id }));
// };
