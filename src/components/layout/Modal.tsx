import logResponse from "lib/client/log/logResponse";
import { setLoading } from "lib/client/store/loadingSlice";
import { setModal } from "lib/client/store/modalSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import logError from "lib/client/log/logError";
// import { deleteItem } from "lib/client/store/cartSlice";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
// import { deleteUser } from "lib/client/store/usersSlice";
// import { deleteData, getData, postData } from "lib/client/utils/fetchData";
export default function Modal() {
  const auth = useSelector((store: any) => store.auth);
  const modal = useSelector((store: any) => store.modal);
  const loading = useSelector((store: any) => store.loading);
  const { active, type, message, id, ids, action, actionLabel, disabled } = modal;
  // const [disabled, setDisabled]: any = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleAction = async (e: any) => {
    e.preventDefault();
    switch (type) {
      case "DEFAULT":
        dispatch(setLoading(true));
        action();
        dispatch(setLoading(false));
        dispatch(setModal({ active: false }));
        break;
      default:
        dispatch(setModal({ active: false }));
        break;
    }
    // try {
    //   dispatch(setLoading(true));
    //   switch (type) {
    //     // case "DELETE_USER":
    //     //   handleDeleteUser();
    //     //   break;
    //     // case "DELETE_PRODUCT":
    //     //   handleDeleteProduct();
    //     //   break;
    //     // case "DELETE_PRODUCTS":
    //     //   handleDeleteProducts();
    //     //   break;
    //     // case "DELETE_CART_ITEM":
    //     //   handleDeleteCartItem();
    //     //   break;
    //     // case "DELETE_POST":
    //     //   handleDeletePost();
    //     //   break;
    //     // case "DELETE_TODO_LIST_ITEM":
    //     //   callback(); // sync callback function
    //     //   break;
    //     default:
    //       break;
    //   }
    //   // dispatch(closeModal());
    //   dispatch(setLoading(false));
    //   // router.push({ pathname: router.pathname });
    //   // router.reload();
    //   // router.push(router.asPath);
    // } catch (error) {
    //   // logError(error);
    //   // dispatch(setLoading(false));
    // }
  };
  const handleClose = () => dispatch(setModal({ active: false }));
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
  //   dispatch(deleteItem({ _id: id }));
  // };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  if (!modal.active) return;
  return (
    <Background onClick={handleClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h3>{type || "test type"}</h3>
        </div>
        {/* <div className="line" /> */}
        <hr />
        <div className="main">
          <p>{message}</p>
        </div>
        <div className="footer">
          <button
            onClick={handleAction}
            // disabled={loading}
          >
            {/* Confirm */}
            {actionLabel}
            {/* {actionLabel || "Confirm"} */}
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
  /* width: 100%;
  height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 5px solid purple;
  background-color: rgba(0, 0, 0, 0.5);
  :focus {
    /* border: 3px solid red; */
    display: none;
  }
`;
const Box = styled.div`
  width: 400px;
  height: 250px;
  background-color: #eee;
  color: green;
  border: 5px solid green;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: pop 0.3s;
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
  }
  > .header {
  }
  > hr {
    border-top: 1px solid green;
  }
  > .main {
    flex: 1;
  }
  > .footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  button {
    padding: 1rem;
    border-radius: 5px;
    /* &:disabled {
      background-color: #777;
      cursor: not-allowed;
    } */
  }
`;
// const handleCreatePost = async ({ title, content }: any) => {
//   try {
//     dispatch(setLoading(true));
//     const response = await postData("posts", { title, content }, auth.accessToken);
//     logResponse(response);
//     dispatch(closeModal());
//     dispatch(setLoading(false));
//   } catch (error) {
//     logError(error);
//     dispatch(setLoading(false));
//   }
// };
// const handleDeletePost = async () => {
//   const response = await deleteData("posts", auth.accessToken, { _id: id });
//   logResponse(response);
// };
