import Paypal from "@/components/button/Paypal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Page() {
  const order = useSelector((store: any) => store.order);
  const auth = useSelector((store: any) => store.auth);
  const router = useRouter();
  const { id } = router.query;
  const { product } = order;
  // console.log({ order });
  // console.log({ id });
  // find the order
  // const order = orders.find((order: any) => order._id === id);
  // console.log("order : ", order);

  // if (!auth.accessToken || !order) return null;
  if (!order) return null;

  return (
    <Main>
      <section>
        <div>
          <button onClick={() => router.back()}>Go Back</button>
          <div className="order">
            <h3 className="title">Order Number : {order.product._id}</h3>
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <p>
                Delivered Status : {order.delivered ? "delivered" : "Not delivered"}
                {auth.role === "user" && <button>Change to Delivered</button>}
              </p>
            </div>
            <div className="product-info">
              <h3>Product Information</h3>
              <div className="product" key={product._id}>
                <Link href={`/commerce/product/${product._id}`}>
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].url}
                    width={300}
                    height={300}
                  />
                </Link>
                <div>
                  <p>Product Number : {product._id}</p>
                  <p>
                    {product.quantity} X ${product.price} = ${product.quantity * product.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="payment">
              <h3>Payment</h3>
              <p>Payment Status : {order.paid ? "Paid" : "Not paid"}</p>
              {/* {!order.paid && auth.user.role === "user" && (
                <>
                  <p>Total : ${order.total}</p>
                  <Paypal order={order} />
                </>
              )}
              {order.paid && (
                <>
                  <p>Payment Method : {order.method}</p>
                  <p>Payment ID : {order.paymentId}</p>
                </>
              )} */}
            </div>
          </div>
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
      > button {
        padding: 1rem;
        border-radius: 5px;
      }
      .order {
        display: grid;
        grid-template-areas:
          "title payment"
          "delivery-info payment"
          "product-info payment";
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        > * {
          border: 2px solid;
          padding: 1rem;
          /* flex: 1; */
          border-radius: 5px;
        }
        .title {
          grid-area: title;
        }
        .delivery-info {
        }
        .product-info {
          /* flex: 1; */
          .product {
            border: 2px solid;
            display: flex;
            gap: 1rem;
            padding: 1rem;
            a {
              width: initial;
              img {
                width: 5rem;
              }
            }
          }
        }
        .payment {
          grid-area: payment;
        }
      }
    }
  }
`;
