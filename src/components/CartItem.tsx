import { decreaseQuantity, deleteItem, increaseQuantity } from "lib/client/store/cartSlice";
import { setModal } from "lib/client/store/modalSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import { openModal } from "lib/client/store/modalSlice";
// import { getData } from "lib/client/utils/fetchData";
export default function CartItem({ item }: any) {
  const { _id, images, title, quantity, inStock, price } = item;
  const dispatch = useDispatch();
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity({ _id }));
  };
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity({ _id }));
  };
  const handleDeleteItem = () => {
    dispatch(
      setModal({ active: true, type: "DELETE_ITEM", message: "Do you want to delete?", id: _id })
    );
  };
  return (
    <Box>
      <div className="product-description">
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
            <p>{title}</p>
            <small>in stock : {inStock}</small>
          </div>
        </Link>
      </div>
      <div className="order-option">
        <h5>Order Option</h5>
        <small>quantity : {quantity}</small>
        <div className="quantity-control-buttons">
          <button onClick={handleDecreaseQuantity} disabled={quantity === 1}>
            -
          </button>
          <button onClick={handleIncreaseQuantity} disabled={quantity === inStock}>
            +
          </button>
        </div>
        <button className="delete-button" onClick={() => dispatch(deleteItem({ _id }))}>
          Delete
        </button>
      </div>
    </Box>
  );
}
const Box = styled.li`
  display: flex;
  border: 2px solid green;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;
  > * {
    /* border: 2px solid; */
  }
  .product-description {
    flex: 1;
    padding: 1rem;
    > a {
      height: 100%;
      display: flex;
      .image {
        /* border: 2px solid red; */
        width: 100px;
        overflow: hidden;
        img {
          height: initial;
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
  }
  .order-option {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 1rem;
    /* justify-content: flex-end; */
    > small {
      color: #5b97ea;
    }
    .quantity-control-buttons {
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
`;
