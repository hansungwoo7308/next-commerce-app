import Orders from "@/components/order/Orders";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/models/Order";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

// export async function getServerSideProps({ req, res, query }: any) {
//   console.log(`\x1b[33m\n[serverside]:::[${req.url}]:::[${req.method}]\x1b[30m`);

//   await connectDB();

//   // get the User id from session
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   const { _id }: any = session.user;

//   // find the Order
//   const orders = await Order.find({ ordererInfo: _id }).populate({ path: "ordererInfo" }).exec();
//   console.log({ orders });

//   return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
// }

export default function Page() {
  // console.log({ orders });

  // internal
  const router = useRouter();

  // fetched from server : swr fetch library
  const fetcher = (url: any) => axios.get(url).then((res: any) => res.data);
  const { data, error, isLoading } = useSWR("/api/v2/orders", fetcher);

  if (isLoading || !data) return null;
  const { orders } = data;
  console.log({ orders });

  if (!orders.length) {
    return (
      <Main className="my-orders-page">
        <section>
          <div>
            <h1>No ordered products</h1>
          </div>
        </section>
      </Main>
    );
  }

  return (
    <Main>
      <section>
        <div>
          <h1>Order List Page</h1>
          <Orders orders={orders} />
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main``;
