import { increaseQuantity, decreaseQuantity, deleteItemFromCart } from "lib/client/store/cartSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { setModal } from "lib/client/store/modalSlice";

export default function Cart({ product }: any) {
  const { _id, name, price, description, category, images, seller, stock, quantity, options } =
    product;
  const dispatch = useDispatch();

  const handleDecreaseQuantity = () => dispatch(decreaseQuantity({ _id }));
  const handleIncreaseQuantity = () => dispatch(increaseQuantity({ _id }));
  const handleDeleteItemFromCart = () =>
    dispatch(setModal({ active: true, type: "DELETE_ITEM", id: _id }));

  return (
    <Box>
      <h1>Seller Name</h1>
      <hr />
      <div className="products">
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
      </div>
    </Box>
  );
}

const Box = styled.li`
  /* display: flex; */
  border: 2px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;

  > hr {
    margin-bottom: 1rem;
  }
  .products {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .product {
      border: 2px solid yellow;
      display: flex;
      /* border */
    }
  }
  .product-info {
    flex: 1;
    /* padding: 1rem; */
    border: 1px solid red;
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
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid blue;
    /* justify-content: flex-end; */
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
`;
