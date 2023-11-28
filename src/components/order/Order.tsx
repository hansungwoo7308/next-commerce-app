import { setModal } from "lib/client/store/modalSlice";
import { deleteOrder } from "lib/client/store/ordersSlice";
import { deleteData } from "lib/client/utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";

export default function Order({ order }: any) {
  // external
  const { ordererInfo, productInfo, deliveryInfo, payInfo } = order;
  const { product } = productInfo;
  const { options } = product;
  // const { isDelivered } = deliveryInfo;
  const { method, paid, total } = payInfo;
  const auth = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  // internal
  // const [expanded, setExpanded]: any = useState(false);

  const handleDeleteOrder = () => {
    const modalAction = async () => {
      try {
        const response = await deleteData(`v2/orders/${order._id}`, null, auth.accessToken);
        console.log({ data: response.data });
        dispatch(deleteOrder({ _id: response.data.deletedOrder._id }));
      } catch (error) {
        console.log({ error });
      }
    };
    dispatch(setModal({ active: true, type: "DELETE_ITEM", modalAction }));
  };

  return (
    <Box>
      <div className="order-header">
        <h3>
          Order Number : {order._id} ({order.createdAt.slice(0, 10)})
        </h3>
        <button className="delete-button" onClick={handleDeleteOrder}>
          Delete
        </button>
      </div>
      <HorizonLine />
      <div className="order">
        <div className="order-image">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.images[0].url || product.images[0].secure_url}
              alt={product.images[0].url || product.images[0].secure_url}
              width={1000}
              height={1000}
            />
          </Link>
        </div>
        <div className="order-info">
          <VerticalLine />
          <div className="product-info">
            <p>Product Information</p>
            {options.map((option: any) => (
              <pre key={option.item}>
                {option.item} : ${option.price} X {option.quantity} = $
                {option.price * option.quantity}
                {/* <span>
                </span> */}
              </pre>
            ))}
          </div>
          <VerticalLine />
          <div className="delivery-info">
            <p>Delivery Information</p>
            <p>State : </p>
            {/* <p>State : {isDelivered ? "delivered" : "not delivered"}</p> */}
          </div>
          <VerticalLine />
          <div className="pay-info">
            <p>Payment Information</p>
            <p>Method : {method}</p>
            <p>State : {paid ? "paid" : "not paid"}</p>
            <p>Total : ${total}</p>
            {/* <small>Payment Date : {order.dateOfPayment}</small>
      <p>Payment Amount : ${order.total}</p> */}
          </div>
        </div>
      </div>
      {/* {expanded ? (
        <ul className="order-list">
          {order.cart.map((item: any) => (
            <li key={item._id} className="product">
              <div className="product-info-image">
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
          <li key={product._id} className="product">
            <div className="product-info-image">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.images[0].url || product.images[0].secure_url}
                  alt={product.images[0].url || product.images[0].secure_url}
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
            <div className="product-info">
              <strong>{product.name}</strong>
            </div>
          </li>
        </ul>
      )} */}
      {/* {order.cart.length >= 2 && (
        <button className="expand-button" onClick={() => setExpanded(!expanded)}>
          View all the products
        </button>
      )} */}
    </Box>
  );
}

const Box = styled.li`
  border: 1px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .order {
    display: flex;
    /* gap: 1rem; */
    /* padding: 1rem; */
    font-size: 14px;
    pre {
      font-family: none !important;
    }
    .order-info {
      flex: 1;
      display: flex;
      > div {
        flex: 1;
      }
      .product-info {
      }
    }
  }
  /* > .expand-button {
    padding: 1rem;
    display: block;
    margin: auto;
    border-radius: 5px;
  } */
  img {
    /* width: 100px; */
    width: 10rem;
    height: 10rem;
  }
`;
const HorizonLine = styled.hr`
  margin: 0.5rem 0 1rem 0;
`;
const VerticalLine = styled.hr`
  margin: 0 1rem;
  width: 1px;
  background-color: #fff;
`;
