// import { setTimeoutId, setNotify, setVisible, setLoading } from "lib/client/store/notifySlice";
// import { useSession } from "next-auth/react";
import { addToCart } from "lib/client/store/cartSlice";
import { setModal } from "lib/client/store/modalSlice";
import { setNotify } from "lib/client/store/notifySlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Product({ product, setCheckedProducts, isCheckAll }: any) {
  // console.log({ product });
  const { _id, images, title, price, inStock, description } = product;
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  // const { auth, cart }: any = useSelector((store) => store);
  const checkboxRef: any = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleCheckBox = (e: any) => {
    // if (e.target.checked) {
    //   setCheckedProducts((state: any) => [...state, _id]);
    // } else {
    //   setCheckedProducts((state: any) => {
    //     const filteredProducts = state.filter((productId: any) => productId !== _id);
    //     return filteredProducts;
    //   });
    // }
  };
  const buttonsByUser = (
    <>
      <Link href={`/products/${_id}`}>View</Link>
      <button
        disabled={inStock ? false : true}
        onClick={() => {
          const duplicate = cart.find((v: any) => v._id === product._id);
          if (duplicate) {
            dispatch(setNotify({ active: true, status: "error", message: "Duplicated" }));
          } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
            const callback = () => router.push("/cart");
            dispatch(
              setModal({
                active: true,
                type: "DEFAULT",
                message: "Do you want to move to cart?",
                callback,
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
    </>
  );
  const buttonsByAdmin = (
    <>
      <Link href={`/products/${_id}`}>Edit</Link>
      <button
        className="delete-button"
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
    </>
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
        {auth.role === "admin" && (
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
        <h5>{title}</h5>
        <div className="price">
          <h6>${price}</h6>
          {inStock > 0 ? <h6>In Stock : {inStock}</h6> : <h6>Out Stock</h6>}
        </div>
        <p>{description}</p>
        <div className="buttons">
          {/* {auth.role === "admin" && buttonsByAdmin} */}
          {auth.user?.role === "user" && buttonsByUser}
        </div>
      </div>
    </Box>
  );
}
const Box = styled.li`
  /* width: 10rem; */
  border: 2px solid green;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  overflow: hidden;
  background-color: #333;
  > .image {
    height: 7rem;
    position: relative;
    .checkbox {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
    > a > img {
      object-position: 0 20%;
      /* object-position: top; */
    }
  }
  > .description {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    .price {
      color: #d25d5d;
    }
    > .buttons {
      flex: 1;
      display: flex;
      justify-content: space-between;
      /* border: 2px solid red; */
      a,
      button {
        height: 2rem;
        place-self: flex-end;
        /* display: flex;
        align-items: center; */
        padding: 0.5rem;
        background-color: #ddd;
        color: #000;
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
