// import { setTimeoutId, setNotify, setVisible, setLoading } from "lib/client/store/notifySlice";
// import { useSession } from "next-auth/react";
import logResponse from "lib/client/log/logResponse";
import { addToCart } from "lib/client/store/cartSlice";
import { addItem, deleteItem } from "lib/client/store/managerSlice";
import { setModal } from "lib/client/store/modalSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { deleteData } from "lib/public/fetchData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
let ratingsData: any[] = [];
for (let i = 0; i < 5; i++) {
  let icons = [];
  for (let j = 0; j <= i; j++) icons.push(<IoStar color="#C7511F" />);
  ratingsData.push({ icons });
}
export default function Product({ product, setCheckedProducts, isCheckAll }: any) {
  // console.log({ product });
  const { _id, category, name, description, seller, price, stock, ratings, images, reviews } =
    product;
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const checkboxRef: any = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleCheckBox = (e: any) => {
    e.target.checked ? dispatch(addItem(_id)) : dispatch(deleteItem(_id));
  };
  const buttonByUser = (
    <button
      disabled={!stock}
      onClick={() => {
        const duplicate = cart.find((v: any) => v._id === product._id);
        if (duplicate) {
          dispatch(setNotify({ active: true, status: "error", message: "Duplicated" }));
        } else {
          dispatch(addToCart({ ...product, quantity: 1 }));
          // const callback = () => router.push("/cart");
          const action = () => router.push("/cart");
          dispatch(
            setModal({
              active: true,
              type: "DEFAULT",
              message: "Do you want to move to cart?",
              actionLabel: "Move to Cart Page",
              action,
            })
          );
        }
        // cart.map((v: any) => console.log(v));
        // if (!cart.length) dispatch(addToCart(product));
        // else {
        //   const duplicate = cart.filter((v: any) => v._id === product._id);
        //   if (duplicate) return;
        //   else dispatch(addToCart(product));
        // }
        // dispatch(addToCart(product));
        // console.log("product._id : ", product._id);
        // console.log("cart : ", cart);
        // if (!cart.length) return dispatch(addToCart(product));
        // const test = cart.every((v: any) => v._id !== product._id);
        // const result = cart.filter((v: any) => v._id === product._id);
        // if (result) console.log(result);
        // cart.map((v: any) => {
        //   if (v._id === product._id) {
        //     return dispatch(setNotify());
        //   } else {
        //     console.log("asdkhadsi");
        //     return dispatch(addToCart(product));
        //   }
        // });
        // cart.find((v: any) => console.log("v:", v));
        // console.log(test);
      }}
    >
      Add to cart
    </button>
  );
  const buttonByAdmin = (
    <button
      className="delete-button"
      onClick={() => {
        const action1 = async () => {
          // delete
          const response = await deleteData(`v2/products/${_id}`, auth.accessToken);
          // const { _id } = response.data.deletedProduct;
          // out
          logResponse(response);
          router.push({ pathname: router.pathname, query: router.query });
          // dispatch(deleteUser({ _id }));
        };
        dispatch(
          setModal({
            active: true,
            type: "DEFAULT",
            message: "Do you want to delete the product?",
            action1Label: "Delete",
            action1,
          })
        );
      }}
      // onClick={() => {
      //   dispatch(
      //     setModal({
      //       type: "DELETE_PRODUCT",
      //       message: "Do you want to delete",
      //       id: _id,
      //     })
      //   );
      // }}
    >
      Delete
    </button>
  );
  // useEffect(() => {
  //   if (isCheckAll) {
  //     checkboxRef.current.checked = true;
  //   }
  //   // else {
  //   //   checkboxRef.current.checked = false;
  //   // }
  // }, [isCheckAll]);
  return (
    <Box>
      <div className="image">
        {auth.user?.role === "admin" && (
          <input ref={checkboxRef} className="checkbox" type="checkbox" onChange={handleCheckBox} />
        )}
        <Link href={`/products/${_id}`}>
          <Image
            src={images[0].url || images[0].secure_url}
            alt={images[0].url}
            width={200}
            height={200}
            priority
          />
        </Link>
      </div>
      <div className="description">
        <div className="left">
          <div className="top">
            <h3>{name}</h3>
          </div>
          <div className="middle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde similique ex sed at
            adipisci nostrum? Obcaecati illo minima corporis maiores dolores ut, magnam accusamus
            dicta natus eum, soluta nisi laborum?
          </div>
        </div>
        <div className="right">
          {/* <div className="stock">{stock > 0 ? <h6>Stock ({stock}) </h6> : <h6>Sold Out</h6>}</div> */}
          <h3 className="price">${price}</h3>
          <div className="ratings">
            <small>{ratings ? ratings + ".0" : "No reviews"}</small>
            <small>
              {ratingsData.map(
                (v: any) => v.icons.length === ratings && <>{v.icons.map((icon: any) => icon)}</>
              )}
            </small>
          </div>
          {auth.user?.role === "admin" && buttonByAdmin}
          {auth.user?.role === "user" && buttonByUser}
        </div>
      </div>
    </Box>
  );
}
const Box = styled.li`
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-between; */
  overflow: hidden;
  background-color: #333;
  > .image {
    width: 10rem;
    height: 10rem;
    position: relative;
    .checkbox {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
    > a > img {
      object-position: center;
      /* object-position: top; */
    }
  }
  > .description {
    flex: 1;
    display: flex;
    /* flex-direction: column; */
    padding: 1rem;
    > * {
      /* border: 2px solid hotpink; */
    }
    > .left {
      flex: 1;
      > .top {
        display: flex;
      }
    }
    > .right {
      min-width: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left: 1px solid;
      padding-left: 1rem;
      .price {
        text-align: end;
      }
      .ratings {
        place-self: flex-end;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .stock {
        color: #d25d5d;
      }
      button {
        padding: 0.5rem;
        background-color: #ddd;
        color: #000;
        border-radius: 3px;
        &:hover {
          background-color: var(--color-primary);
        }
      }
      .delete-button {
        background-color: #c15151;
      }
    }
  }
`;