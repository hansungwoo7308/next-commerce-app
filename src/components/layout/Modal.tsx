import logResponse from "lib/client/log/logResponse";
import { setLoading } from "lib/client/store/loadingSlice";
import { setModal } from "lib/client/store/modalSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import logError from "lib/client/log/logError";
// import { deleteItem } from "lib/client/store/cartSlice";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
// import { deleteUser } from "lib/client/store/usersSlice";
// import { deleteData, getData, postData } from "lib/client/utils/fetchData";
export default function Modal() {
  const modal = useSelector((store: any) => store.modal);
  const auth = useSelector((store: any) => store.auth);
  // get the setting values
  const { active, type, message, id, ids, callback } = modal;
  const router = useRouter();
  const dispatch = useDispatch();
  const handleConfirm = async (e: any) => {
    e.preventDefault();
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
  // const form = (
  //   <form
  //     onSubmit={handleSubmit((data) => {
  //       const { title, content } = data;
  //       handleCreatePost({ title, content });
  //       dispatch(closeModal());
  //       // router.reload();
  //       router.push(router.asPath);
  //     })}
  //   >
  //     <div>
  //       <input {...register("title", { required: true })} type="text" placeholder="Title" />
  //       <textarea
  //         {...register("content", { required: true })}
  //         cols={30}
  //         rows={10}
  //         placeholder="Content"
  //       ></textarea>
  //     </div>
  //     <div>
  //       <button>Submit</button>
  //       <button onClick={() => dispatch(closeModal())}>Close</button>
  //     </div>
  //   </form>
  // );
  // if (!modal.visible) return null;
  if (!modal.active) return;
  return (
    <Background onClick={() => dispatch(setModal({ active: false }))}>
      <Box onClick={(e) => e.stopPropagation()}>
        <h1>{type || "test type"}</h1>
        <h5>{message}</h5>
        <div>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={() => dispatch(setModal({ active: false }))}>Close</button>
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
  position: absolute;
  background-color: white;
  outline: 5px solid;
  padding: 2rem;
  > div {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  button {
    padding: 1rem;
    cursor: pointer;
  }
`;
