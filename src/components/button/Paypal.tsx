import { PayPalButtons } from "@paypal/react-paypal-js";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { clearCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { postData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Paypal({ order }: any) {
  // const { auth }: any = useSelector((store) => store);
  const auth = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log("order : ", order);
  return (
    <Box>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: order.total } }],
          });
        }}
        onApprove={(data, actions: any) => {
          // console.log("onApprove data : ", data);
          // console.log("createOrder order : ", order);
          return actions.order.capture().then((details: any) => {
            console.log({ details });
            const createOrder = async () => {
              try {
                const payload = {
                  _id: order._id,
                  paymentId: details.payer.payer_id,
                };
                const response = await postData("pay", payload, auth.accessToken);
                // const { paidOrder } = response.data;
                logResponse(response);
                dispatch(
                  setNotify({
                    active: "true",
                    status: "success",
                    message: "The Order was created.",
                  })
                );
                router.push("/my/order-list");
              } catch (error) {
                logError(error);
                dispatch(
                  setNotify({
                    active: "true",
                    status: "error",
                    message: "The Order was failed.",
                  })
                );
                router.push("/cart");
              }
            };
            createOrder();
            // console.log("onApprove action.order.capture:resolved.details : ", details);
            // alert(`Transaction completed by ${name}`);
            // const name = details.payer.name.given_name;
            // const paylaod = { ...cart, details };
          });
        }}
      />
    </Box>
  );
}
const Box = styled.div``;
