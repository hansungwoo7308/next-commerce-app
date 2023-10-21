// import { useSession } from "next-auth/react";
import Stars from "@/components/product/Stars";
import { addToCart } from "lib/client/store/cartSlice";
import { addProductId, removeProductId } from "lib/client/store/productManagerSlice";
import { setModal } from "lib/client/store/modalSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function Product({ product }: any) {
  // external
  const { _id, category, name, description, seller, price, stock, ratings, images, reviews } =
    product;
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const { selectedProductIds } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();

  // internal
  const checkRef: any = useRef();
  const router = useRouter();

  const handleSelect = (e: any) => {
    e.target.checked ? dispatch(addProductId(_id)) : dispatch(removeProductId(_id));
  };

  // const handleSelect = (e: any) => {
  //   // e.target.checked ? dispatch(addItem(_id)) : dispatch(deleteItem(_id));
  //   e.target.checked
  //     ? setSelectedProductIds((state: any) => [...state, _id])
  //     : setSelectedProductIds((state: any) => {
  //         const filteredProductIds = state.filter(
  //           (selectedProductId: any) => selectedProductId !== _id
  //         );
  //         return filteredProductIds;
  //       });
  // };
  const buttonByUser = (
    <button
      className="add-button"
      disabled={!stock}
      onClick={() => {
        const duplicate = cart.products.find((v: any) => v._id === product._id);
        if (duplicate) return toast.error("Duplicated product from cart");
        const newItem = { item: name, price: price, quantity: 1 };
        dispatch(addToCart({ ...product, options: [newItem] }));
        const modalAction = () => router.push("/cart");
        dispatch(
          setModal({
            active: true,
            // type: "DEFAULT",
            message: "Do you want to move to cart?",
            modalAction,
            modalActionLabel: "Move to Cart Page",
          })
        );

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
      onClick={() => dispatch(setModal({ active: true, type: "DELETE_PRODUCT", id: _id }))}
    >
      Delete
    </button>
  );
  useEffect(() => {
    if (!selectedProductIds || !checkRef.current) return;
    if (selectedProductIds.length === 0) checkRef.current.checked = false;
    selectedProductIds.map((selectedProductId: any) => {
      if (selectedProductId === _id) checkRef.current.checked = true;
    });
  }, [selectedProductIds]);

  return (
    <Box>
      <div className="image">
        {auth.user?.role === "admin" && (
          <input ref={checkRef} className="checkbox" type="checkbox" onChange={handleSelect} />
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
              <Stars number={ratings} />
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
        border-radius: 3px;
      }
    }
  }
`;
