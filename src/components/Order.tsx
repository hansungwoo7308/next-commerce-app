import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { styled } from "styled-components";
export default function Order({ order }: any) {
  const [expanded, setExpanded]: any = useState(false);
  return (
    <Box>
      <h3>Order Number : {order._id}</h3>
      <small>Payment Date : {order.dateOfPayment}</small>
      <p>Payment Amount : ${order.total}</p>
      {expanded ? (
        <ul className="order-list">
          {order.cart.map((item: any) => (
            <li key={item._id} className="order-item">
              <div className="product-thumbnail">
                <Link href={`/products/${item._id}`}>
                  <Image
                    src={item.images[0].url || item.images[0].secure_url}
                    alt={item.images[0].url || item.images[0].secure_url}
                    width={1000}
                    height={1000}
                  />
                </Link>
              </div>
              <div className="product-info">
                <strong>{item.name}</strong>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="order-list">
          <li key={order.cart[0]._id} className="order-item">
            <div className="product-thumbnail">
              <Link href={`/products/${order.cart[0]._id}`}>
                <Image
                  src={order.cart[0].images[0].url || order.cart[0].images[0].secure_url}
                  alt={order.cart[0].images[0].url || order.cart[0].images[0].secure_url}
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
            <div className="product-info">
              <strong>{order.cart[0].name}</strong>
            </div>
          </li>
        </ul>
      )}
      {order.cart.length >= 2 && (
        <button className="expand-button" onClick={() => setExpanded(!expanded)}>
          View all the products
        </button>
      )}
    </Box>
  );
}
const Box = styled.li`
  border: 2px solid green;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;
  > .order-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    > .order-item {
      display: flex;
      gap: 1rem;
      border: 2px solid;
      border-radius: 5px;
      padding: 1rem;
    }
  }
  > .expand-button {
    padding: 1rem;
    display: block;
    margin: auto;
    border-radius: 5px;
  }
  img {
    width: 100px;
  }
`;
