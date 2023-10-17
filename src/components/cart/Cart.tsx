import { increaseQuantity, decreaseQuantity, deleteItemFromCart } from "lib/client/store/cartSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { setModal } from "lib/client/store/modalSlice";
import { useEffect, useState } from "react";

export default function Cart({ product }: any) {
  // exteranl
  const dispatch = useDispatch();
  const { _id, name, price, images, seller, stock, quantity, options } = product;

  const handleDecreaseQuantity = () => dispatch(decreaseQuantity({ _id }));
  const handleIncreaseQuantity = () => dispatch(increaseQuantity({ _id }));
  const handleDeleteItemFromCart = () =>
    dispatch(setModal({ active: true, type: "DELETE_ITEM", id: _id }));

  // internal
  const [total, setTotal]: any = useState(0);
  useEffect(() => {
    options.map((option: any) => {
      console.log({ option });
      const total = option.price * option.quantity;
      setTotal((state: any) => state + total);
    });
  }, []);
  useEffect(() => {
    console.log({ total });
  }, [total]);

  return (
    <Box>
      <h1>{seller}</h1>
      <hr />
      <div className="product">
        <div className="product-info">
          <Link href={`/products/${_id}`}>
            <div className="image">
              <Image
                src={images[0].url || images[0].secure_url}
                alt={images[0].url || images[0].secure_url}
                width={1000}
                height={1000}
              />
            </div>
            <div className="description">
              <p>{name}</p>
              <small>stock : {stock}</small>
            </div>
          </Link>
        </div>
        <div className="options">
          <ul className="options-list">
            {options.map((option: any) => (
              <li>
                <h3>{option.item}</h3>
                <p>
                  ${option.price} X {option.quantity} = ${option.price * option.quantity}
                </p>
              </li>
            ))}
          </ul>
          <div className="options-controller">
            <small>quantity : {quantity}</small>
            <div className="buttons">
              <button onClick={handleDecreaseQuantity} disabled={quantity === 1}>
                -
              </button>
              <button onClick={handleIncreaseQuantity} disabled={quantity === stock}>
                +
              </button>
            </div>
            <button className="delete-button" onClick={handleDeleteItemFromCart}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="total">
        <h3>주문금액</h3>
        {options.map((option: any) => (
          <li>
            <h3>{option.item}</h3>
            <p></p>
          </li>
        ))}
        <p>{/* {price} * {quantity} = {price * quantity} */}</p>
      </div>
      {/* <div className="product">
          <div className="product-info">
            <Link href={`/products/${_id}`}>
              <div className="image">
                <Image
                  src={images[0].url || images[0].secure_url}
                  alt={images[0].url || images[0].secure_url}
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="description">
                <p>{name}</p>
                <small>stock : {stock}</small>
              </div>
            </Link>
          </div>
          <div className="options">
            <h5>Order Option</h5>
            <small>quantity : {quantity}</small>
            <div className="buttons">
              <button onClick={handleDecreaseQuantity} disabled={quantity === 1}>
                -
              </button>
              <button onClick={handleIncreaseQuantity} disabled={quantity === stock}>
                +
              </button>
            </div>
            <button className="delete-button" onClick={handleDeleteItemFromCart}>
              Delete
            </button>
          </div>
        </div> */}
    </Box>
  );
}

const Box = styled.li`
  /* display: flex; */
  border: 2px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;
  hr {
    margin: 1rem 0;
  }
  .product {
    border: 2px solid yellow;
    display: flex;
  }
  .product-info {
    flex: 1;
    /* padding: 1rem; */
    /* border: 1px solid red; */
    > a {
      height: 100%;
      display: flex;
    }
    .image {
      /* border: 2px solid red; */
      width: 10rem;
      overflow: hidden;
      img {
        /* height: initial; */
      }
    }
    .description {
      flex: 1;
      padding: 1rem;
      > small {
        color: #ea5b5b;
      }
    }
  }
  .options {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border: 2px solid red;
    .options-controller {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      padding: 1rem;
      > small {
        color: #5b97ea;
      }
      .buttons {
        display: flex;
        gap: 0.5rem;
        > button {
          padding: 0.5rem 1rem;
          background-color: #999;
          &:disabled {
            cursor: not-allowed;
            background-color: #222;
            color: inherit;
          }
        }
        /* border: 2px solid red; */
      }
      .delete-button {
        /* background-color: #ea5b5b; */
        padding: 0.5rem 1rem;
        &:hover {
          background-color: #ea5b5b;
        }
      }
    }
  }
  .total {
    text-align: end;
  }
`;
