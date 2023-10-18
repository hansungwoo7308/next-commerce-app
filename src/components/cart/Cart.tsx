import {
  increaseQuantity,
  decreaseQuantity,
  increaseProductOption,
} from "lib/client/store/cartSlice";
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

  const handleIncreaseProductOption = (item: any) => {
    console.log("handleIncreaseProductOption");
    console.log({ item });
    dispatch(increaseProductOption({ _id, item }));
  };

  const handleDecreaseQuantity = () => dispatch(decreaseQuantity({ _id }));
  const handleIncreaseQuantity = () => dispatch(increaseQuantity({ _id }));
  const handleDeleteItemFromCart = () =>
    dispatch(setModal({ active: true, type: "DELETE_ITEM", id: _id }));

  // internal
  const [total, setTotal]: any = useState(0);

  useEffect(() => {
    // options.map((option: any) => {
    //   console.log({ option });
    //   const total = option.price * option.quantity;
    //   setTotal((state: any) => state + total);
    // });
    const total = options.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    setTotal(total);
  }, []);

  return (
    <Box>
      <div className="product-header">
        <h1>Seller : {seller}</h1>
        <button className="delete-button" onClick={handleDeleteItemFromCart}>
          Delete
        </button>
      </div>
      <HorizonLine />
      <div className="product-main">
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
        <VerticalLine />
        <ul className="options">
          {options.map((option: any) => (
            <li className="option">
              <p>{option.item}</p>
              <p>
                ${option.price} X {option.quantity} = ${option.price * option.quantity}
              </p>
              <div className="buttons">
                <button onClick={handleDecreaseQuantity} disabled={quantity === 1}>
                  -
                </button>
                <button
                  onClick={() => handleIncreaseProductOption(option.item)}
                  disabled={quantity === stock}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <HorizonLine />
      <div className="product-footer">
        <h3>주문금액 ${total}</h3>
      </div>
    </Box>
  );
}

const Box = styled.li`
  border: 2px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;
  .product-header {
    display: flex;
    justify-content: space-between;

    .delete-button {
      /* background-color: #ea5b5b; */
      padding: 0.5rem 1rem;
      &:hover {
        background-color: #ea5b5b;
      }
    }
  }
  .product-main {
    /* border: 2px solid yellow; */
    display: flex;
    .product-info {
      flex: 1;
      /* padding: 1rem; */
      /* border: 1px solid red; */
      > a {
        height: 100%;
        display: flex;
        gap: 1rem;
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
        /* padding: 1rem; */
        > small {
          color: #ea5b5b;
        }
      }
    }
    .options {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        border: 1px solid;
        padding: 0.3rem;
        .buttons {
          display: flex;
          gap: 0.5rem;
          > button {
            width: 1.2rem;
            height: 1.2rem;
            background-color: #999;
            display: flex;
            justify-content: center;
            align-items: center;
            &:disabled {
              cursor: not-allowed;
              background-color: #222;
              color: inherit;
            }
          }
        }
      }
    }
  }
  .product-footer {
    text-align: end;
  }
`;
const HorizonLine = styled.hr`
  margin: 1rem 0;
`;
const VerticalLine = styled.hr`
  margin: 0 1rem;
  width: 1px;
  background-color: #fff;
`;
