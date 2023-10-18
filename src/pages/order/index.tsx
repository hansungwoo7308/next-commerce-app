import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  // external
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const order = useSelector((store: any) => store.order);
  const dispatch = useDispatch();
  const router = useRouter();

  // internal
  const [payload, setPayload]: any = useState({
    address: "",
    mobile: "",
    cart: cart.products,
    total: cart.products.reduce((a: any, v: any) => a + v.price * v.quantity, 0),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handlePayment = async (data: any) => {
    console.log({ data });
    router.push(`/order/${order.product._id}`);
    return;
    // // try {
    // //   dispatch(setLoading(true));
    // const response = await postData("order", payload, auth.accessToken);
    // // console.log({ data: response.data });
    // const { order } = response.data;
    // logResponse(response);
    // dispatch(setOrder(order));
    // // dispatch(clearCart());
    // //   dispatch(setLoading(false));
    // router.push(`/order/${order._id}`);
    // // } catch (error) {
    // //   logError(error);
    // //   dispatch(setLoading(false));
    // // }
  };

  return (
    <Main>
      <section>
        <form className="order">
          <div className="order-top">
            {/* <div className="orderer-info">
              <h3>Orderer Information</h3>
              <p>Orderer Name : {auth.user?.username}</p>
              <p>Orderer Email : {auth.user?.email}</p>
            </div> */}
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <label>
                <p>Receiver Name : </p>
                <input
                  {...register("receiver-name")}
                  type="text"
                  defaultValue={auth.user?.username}
                />
              </label>
              <label>
                <p>Receiver Email : </p>
                <input
                  {...register("receiver-email")}
                  type="email"
                  defaultValue={auth.user?.email}
                />
              </label>
              <label>
                <p>Receiver Address : </p>
                <input {...register("receiver-address")} type="text" />
              </label>
              <label>
                <p>Receiver Mobile : </p>
                <input {...register("receiver-mobile")} type="text" />
              </label>

              {/* <form className="delivery-info-form">
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
              </form> */}
            </div>
            <VerticalLine />
            <div className="pay-for-order">
              <div className="pay-info">
                <h3>Payment Information</h3>
                <p>Total : ${order.payInfo?.total}</p>
              </div>
              <button className="pay-button" onClick={handleSubmit(handlePayment)}>
                Pay for Order
              </button>
            </div>
          </div>
        </form>
      </section>
    </Main>
  );
}

const VerticalLine = styled.hr`
  margin: 0 1rem;
  width: 1px;
  background-color: #fff;
`;

const Main = styled.main`
  > section {
    > .order {
      border: 1px solid green;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > * {
        border: 1px solid;
        padding: 1rem;
        /* margin: 1rem 0; */
      }
      .order-top {
        display: flex;
        > div {
          flex: 1;
        }
        .delivery-info-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          input {
            padding: 5px 10px;
          }
        }
      }
    }
  }
`;
