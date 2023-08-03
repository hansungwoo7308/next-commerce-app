import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { clearCart } from "lib/client/store/cartSlice";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { postData } from "lib/public/fetchData";
import { setOrder } from "lib/client/store/orderSlice";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { postData } from "lib/client/utils/fetchData";
// import { addOrder } from "lib/client/store/ordersSlice";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
// import Paypal from "@/components/commerce/Paypal";
export default function Page() {
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const [payload, setPayload]: any = useState({
    address: "",
    mobile: "",
    cart: cart,
    total: cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePayment = async () => {
    // try {
    //   dispatch(setLoading(true));
    const response = await postData("order", payload, auth.accessToken);
    // console.log({ data: response.data });
    const { order } = response.data;
    logResponse(response);
    dispatch(setOrder(order));
    // dispatch(clearCart());
    //   dispatch(setLoading(false));
    router.push(`/order/${order._id}`);
    // } catch (error) {
    //   logError(error);
    //   dispatch(setLoading(false));
    // }
  };
  return (
    <Main>
      <section>
        <div>
          <div className="user-info">
            <h3>Orderer Information</h3>
            <p>Orderer Name : {auth.user?.username}</p>
            <p>Orderer Email : {auth.user?.email}</p>
          </div>
          <div className="delivery-info">
            <h3>Delivery Information</h3>
            <p>Receiver Name : {auth.user?.username}</p>
            <p>Receiver Email : {auth.user?.email}</p>
            <form className="delivery-info-form">
              <input
                name="address"
                type="text"
                required
                placeholder="Address"
                onChange={(e: any) => setPayload({ ...payload, address: e.target.value })}
              />
              <input
                name="mobile"
                type="text"
                required
                placeholder="Mobile : 010-0000-0000"
                onChange={(e: any) => setPayload({ ...payload, mobile: e.target.value })}
              />
            </form>
          </div>
          <div className="payment-info">
            <h3>Payment</h3>
            <p>Total : ${payload.total}</p>
          </div>
          <button onClick={handlePayment}>Pay for Order</button>
        </div>
      </section>
    </Main>
  );
}
const Main = styled.main`
  > section {
    > div {
      border: 2px solid green;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      > * {
        width: 100%;
        border: 2px solid;
        padding: 1rem;
        /* margin: 1rem 0; */
      }
      .delivery-info-form {
        /* border: 2px solid green; */
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        input {
          padding: 5px 10px;
        }
      }
      .order-button {
        display: flex;
        justify-content: center;
      }
      > button {
        width: initial;
        margin: auto;
        padding: 1rem;
      }
    }
  }
`;
