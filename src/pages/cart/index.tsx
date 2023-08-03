import CartItem from "@/components/CartItem";
import { reloadCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import CartItem from "@/components/commerce/CartItem";
// import { addOrder } from "lib/client/store/orderSlice";
// import { getData } from "lib/client/utils/fetchData";
export default function Page() {
  const cart = useSelector((store: any) => store.cart);
  const auth = useSelector((store: any) => store.auth);
  const [total, setToal]: any = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const setCart = async () => {
    let newCart: any = [];
    for (const item of cart) {
      const response = await getData(`products/${item._id}`);
      console.log({ data: response.data });
      const { product } = response.data;
      const { inStock, quantity } = item;
      if (inStock) newCart.push({ ...product, quantity });
    }
    dispatch(reloadCart(newCart));
  };
  useEffect(() => {
    // 주문금액을 스토어에 저장한다.
    const total = cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    setToal(total);
  }, [cart]); // set the tatal
  useEffect(() => {
    // Up-To-Date Product Data (inStock, ...)
    // const stringfiedCart: any = localStorage.getItem("cart");
    // if (!stringfiedCart) return;
    // const cart: any = JSON.parse(stringfiedCart);
    setCart();
  }, []); // get the up-to-date cart
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
  return (
    <Main>
      <section>
        <div className="cart">
          {cart.length ? (
            <>
              <h1>Shopping Cart</h1>
              <ul>
                {cart.map((item: any) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </ul>
              <h3>Total : ${cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0)}</h3>
              <div className="payment">
                <button onClick={handleOrder}>Order</button>
              </div>
            </>
          ) : (
            <h1>No items</h1>
          )}
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
