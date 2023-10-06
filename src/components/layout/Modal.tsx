import CreateProductForm from "@/components/form/CreateProductForm";
import CreateProductReviewForm from "@/components/form/CreateProductReviewForm";
import logResponse from "lib/client/log/logResponse";
import { setLoading } from "lib/client/store/loadingSlice";
import { setModal } from "lib/client/store/modalSlice";
import { deleteData, postData } from "lib/public/fetchData";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import logError from "lib/client/log/logError";
// import { deleteItemFromCart } from "lib/client/store/cartSlice";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
// import { deleteUser } from "lib/client/store/usersSlice";
// import { deleteData, getData, postData } from "lib/client/utils/fetchData";
export default function Modal() {
  const { accessToken } = useSelector((store: any) => store.auth);
  const { active, type, message, id, ids, modalAction, actionLabel, disabled, src } = useSelector(
    (store: any) => store.modal
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setModal({ active: false }));

  if (!active) return null;
  if (type === "VIEW_IMAGE") {
    return (
      <Background onClick={handleClose}>
        <Box style={{ minWidth: "500px" }} onClick={(e) => e.stopPropagation()}>
          <Image src={src} alt="alt" width={500} height={500} />
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
            <button
              className="delete-button"
              onClick={async () => {
                console.log("testing...");
                // const response = await deleteData(`v2/products/${id}`, null, accessToken);
                // logResponse(response);
                // router.push({ pathname: router.pathname });
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
  // return (
  //   <Background onClick={handleClose}>
  //     <Box onClick={(e) => e.stopPropagation()}>
  //       <div className="header">
  //         <h3>{type || "test type"}</h3>
  //       </div>
  //       <hr />
  //       <div className="main">
  //         <p>{message}</p>
  //       </div>
  //       <div className="footer">
  //         <button
  //           onClick={handleAction}
  //           // disabled={loading}
  //         >
  //           {/* Confirm */}
  //           {/* {actionLabel} */}
  //           {actionLabel || "Confirm"}
  //         </button>
  //         <button onClick={handleClose}>Close</button>
  //       </div>
  //     </Box>
  //   </Background>
  // );
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
  outline: 5px solid purple;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
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
  > .CREATE_PRODUCT_REVIEW {
    /* border: 3px solid coral; */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > .middle {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      input {
        width: 100%;
      }
    }
    > .bottom {
      display: flex;
      justify-content: end;
      gap: 0.5rem;
    }
  }
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
  > .modal-image {
    min-width: 500px;
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
// const handleDeleteCartItem = async () => {
//   dispatch(deleteItemFromCart({ _id: id }));
// };
