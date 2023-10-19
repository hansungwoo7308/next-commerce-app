import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { setLoading } from "lib/client/store/loadingSlice";
import { addToOrdered } from "lib/client/store/orderedSlice";
import { clearCart } from "lib/client/store/cartSlice";
import { toast } from "react-toastify";
import { postData } from "lib/public/fetchData";

export default function Page() {
  // external
  const auth = useSelector((store: any) => store.auth);
  const order = useSelector((store: any) => store.order);
  const dispatch = useDispatch();
  const router = useRouter();

  // internal
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [payMethod, setPayMethod]: any = useState(null);

  const handlePayment = async (data: any) => {
    console.log({ data });
    const payload = {
      ordererInfo: {
        User: auth.user._id,
      },
      productInfo: {
        product: order.product,
      },
      deliveryInfo: {
        name: data.name,
        email: data.email,
        address: data.address,
        mobile: data.mobile,
      },
      payInfo: {
        total: order.payInfo.total,
        method: payMethod,
      },
    };
    switch (data.paymentMethod) {
      case "prepay":
        pay(payload);
        break;
      case "postpay":
        break;
      default:
        break;
    }
  };
  const pay = async (payload: any) => {
    try {
      dispatch(setLoading(true));
      const response = await postData("v2/order", payload, auth.accessToken);
      console.log({ response });
      // dispatch(addToOrdered(response.data.order))
      // dispatch(clearCart());
      dispatch(setLoading(false));
      router.push(`/order/${order._id}`);
    } catch (error: any) {
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };

  return (
    <Main>
      <section>
        <div className="order-outer">
          <form className="order">
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
                  {...register("name")}
                  type="text"
                  defaultValue={auth.user?.username || "tom"}
                />
              </label>
              <label>
                <p>Receiver Email : </p>
                <input
                  {...register("email")}
                  type="email"
                  defaultValue={auth.user?.email || "tom@tom"}
                />
              </label>
              <label>
                <p>Receiver Address : </p>
                <input {...register("address")} type="text" />
              </label>
              <label>
                <p>Receiver Mobile : </p>
                <input {...register("mobile")} type="text" />
              </label>
            </div>
            <VerticalLine />
            <div className="pay-for-order">
              <div className="pay-info">
                <h3>Payment Information</h3>
                <p>Total : ${order.payInfo?.total}</p>
                <p>Payment Method (결제방식)</p>
                <label>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value="prepay"
                    onChange={(e) => setPayMethod(e.target.value)}
                  />
                  선불결제
                </label>
                <label>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value="postpay"
                    onChange={(e) => setPayMethod(e.target.value)}
                  />
                  후불결제
                </label>
              </div>
              {payMethod === "prepay" ? (
                <button className="pay-button" onClick={handleSubmit(handlePayment)}>
                  Prepay for order
                </button>
              ) : payMethod === "postpay" ? (
                <button className="pay-button" onClick={handleSubmit(handlePayment)}>
                  Postpay for order
                </button>
              ) : null}
            </div>
          </form>
        </div>
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
    > .order-outer {
      padding: 1rem;
      border: 1px solid;
      > .order {
        border: 1px solid;
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        background-color: #333;
        > div {
          flex: 1;
        }
      }
    }
  }
`;
