import Orders from "@/components/order/Orders";
import { setOrders } from "lib/client/store/ordersSlice";
import { getData } from "lib/public/fetchData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function Page() {
  const auth = useSelector((store: any) => store.auth);
  const { orders } = useSelector((store: any) => store.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData: any = async () => {
      try {
        const response = await getData("v2/orders", null, auth.accessToken);
        const { orders } = response.data;
        console.log({ orders });
        dispatch(setOrders(orders));
      } catch (error: any) {
        toast.error(error.message);
        console.log({ error });
      }
    };
    if (auth.accessToken) fetchData();
  }, [auth.accessToken]);

  if (!orders.length) return null;
  return (
    <Main>
      <section>
        <div>
          <h1>Ordered List</h1>
          <Orders orders={orders} />
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main``;
