import CartItem from "@/components/cart/CartItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { getData } from "lib/public/fetchData";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function Page() {
  // external
  const dispatch = useDispatch();
  const cart = useSelector((store: any) => store.cart);
  const auth = useSelector((store: any) => store.auth);
  // internal
  const router = useRouter();
  const [total, setTotal]: any = useState(0);

  const setCart = async () => {
    let newCart: any = [];
    for (const item of cart) {
      // console.log({ item });
      try {
        const response = await getData(`products/${item._id}`);
        console.log({ data: response.data });
        const { product } = response.data;
        if (!product) return toast.error("No product");
        const { stock, quantity } = item;
        if (stock) newCart.push({ ...product, quantity });
      } catch (error: any) {
        toast.error(error.message);
        console.log({ error });
      }
    }
    dispatch(reloadCart(newCart));
  };
  const handleOrder = (e: any) => {
    e.preventDefault();
    if (!auth.accessToken) {
      dispatch(setNotify({ status: "error", message: "You have to log in.", visible: true }));
      return router.push("/auth/signin");
    }
    // const { address, mobile } = data;
    // const payload = {
    //   address,
    //   mobile,
    //   cart,
    //   total,
    // };
    // dispatch(addOrder(payload));
    router.push("/order");
  };

  // set the tatal
  useEffect(() => setTotal(cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0)), [cart]);
  // get the up-to-date cart
  useEffect(() => {
    // Up-To-Date Product Data (stock, ...)
    // const stringfiedCart: any = localStorage.getItem("cart");
    // if (!stringfiedCart) return;
    // const cart: any = JSON.parse(stringfiedCart);
    setCart();
  }, []);

  if (!cart.length) {
    return (
      <Main>
        <section>
          <div className="cart">
            <h1>No items</h1>
          </div>
        </section>
      </Main>
    );
  }
  return (
    <Main>
      <section>
        <div className="cart">
          <h1>Shopping Cart</h1>
          <ul>
            {cart.map((item: any) => (
              <CartItem key={item._id} item={item} />
            ))}
          </ul>
          <h3>Total : ${total}</h3>
          <div className="payment">
            <button onClick={handleOrder}>Order</button>
          </div>
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  > section {
    flex-direction: column;
    justify-content: flex-start;
    gap: 3rem;
    .cart {
      padding: 1rem;
      border: 2px solid green;
      > * {
        /* border: 2px solid; */
        /* width: 100%; */
        margin: 1rem 0;
      }
      > ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      > h3 {
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border: 2px solid;
        border-radius: 5px;
        padding: 1rem;
      }
      > .payment {
        display: flex;
        justify-content: center;
        > button {
          padding: 1rem;
          background-color: #000;
          &:hover {
            background-color: green;
          }
        }
      }
    }
  }
`;
