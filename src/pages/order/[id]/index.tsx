import Paypal from "@/components/button/Paypal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  const orders = useSelector((store: any) => store.orders);
  const auth = useSelector((store: any) => store.auth);
  const router = useRouter();
  const { id } = router.query;
  // find the order
  const order = orders.find((order: any) => order._id === id);
  console.log("order : ", order);
  if (!auth.accessToken) return null;
  return (
    <Main>
      <section>
        <div>
          <button onClick={() => router.back()}>Go Back</button>
          {order && (
            <div className="order">
              <div className="shipping">
                <h1>Shipping</h1>
                <p>Order Number : {order._id}</p>
                <p>User Name : {order.User.username}</p>
                <p>User Address : {order.address}</p>
                <p>User Mobile : {order.mobile}</p>
                <p>
                  Delivered Status : {order.delivered ? "delivered" : "Not delivered"}
                  {auth.role === "user" && <button>Change to Delivered</button>}
                </p>
              </div>
              <div className="products">
                <h1>Products</h1>
                {order.cart.map((product: any) => (
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
                ))}
              </div>
              <div className="payment">
                <h1>Payment</h1>
                <p>Payment Status : {order.paid ? "Paid" : "Not paid"}</p>
                {!order.paid && order.User.role === "user" && (
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
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Main>
  );
}
const Main = styled.main`
  > section {
    > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > button {
        width: 5rem;
      }
      .order {
        display: grid;
        grid-template-areas:
          "shipping payment"
          "products payment";
        grid-template-columns: 2fr 1fr;
        > * {
          border: 2px solid;
          padding: 1rem;
          /* flex: 1; */
        }
        .shipping {
        }
        .products {
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
