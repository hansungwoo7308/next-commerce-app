import ImageViewer from "@/components/product/ImageViewer";
import Stars from "@/components/product/Stars";
import Option from "@/components/product/Option";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "lib/client/store/cartSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface Props {
  product?: any;
}

// static variable
const options = [
  {
    item: "option1",
    price: 3,
  },
  {
    item: "option2",
    price: 5,
  },
  {
    item: "option3",
    price: 7,
  },
];

export default function ProductDetailWidget({ product }: Props) {
  // external
  const { name, price, description, category, seller, stock, ratings, images, reviews } = product;
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  // internal
  const [total, setTotal]: any = useState(0);
  const [selectedOptions, setSelectedOptions]: any = useState([]);
  useEffect(() => {
    // if (selectedOptions.length) console.log({ selectedOptions });
  }, [selectedOptions]);
  useEffect(
    () => setTotal(selectedOptions.reduce((a: any, v: any) => a + v.price * v.quantity, 0)),
    [selectedOptions]
  );
  // useEffect(() => {
  //   // if (total) console.log({ total });
  // }, [total]);
  // useEffect(() => {
  //   if (cart.products.length) console.log({ cart });
  // }, [cart]);

  return (
    <Box className="widget">
      <div className="left">
        <ImageViewer images={images} />
      </div>
      <div className="right">
        <div className="product-titles">
          <div className="product-name-and-price">
            <h1>{name}</h1>
            <p>price : ${price}</p>
          </div>
          <div className="ratings-and-reviews">
            <div className="ratings">
              {ratings === 0 ? (
                <div>
                  <h5>No reviews</h5>
                </div>
              ) : (
                <div>
                  <span>{ratings + ".0"}</span>
                  <Stars number={ratings} />
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="description">
          <p>category : {category}</p>
          <p>seller : {seller}</p>
          <p>stock : {stock ? "in stock" : "out stock"}</p>
        </div>
        <hr />
        <div className="delivery">
          <p>Delivery : Free Shipping (CJ 대한통운)</p>
          <small>제주,도서지역 추가 3,000원 / 도서산간지역 추가배송비 발생됩니다</small>
        </div>
        <hr />
        <Option
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          options={options}
        />
        <hr />
        <strong>총 상품금액 : ${total}</strong>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <div className="controller">
          <button
            onClick={() => {
              // const duplicate = cart.find((v: any) => v._id === product._id);
              // if (duplicate) return toast.error("Already added it");
              // else dispatch(addToCart({ ...product, quantity: 1 }));
              dispatch(addToCart({ ...product, options: selectedOptions }));
            }}
          >
            Add to Cart
          </button>
          <button>Buy</button>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  > * {
    padding: 1rem;
  }
  > .left {
  }
  > .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > .product-titles {
      > .product-name-and-price {
        display: flex;
        justify-content: space-between;
        align-items: end;
      }
      > .ratings-and-reviews {
        > .ratings {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
    > .description {
      .stock-outer {
        display: flex;
        justify-content: space-between;
      }
    }
    > .controller {
      flex: 1;
      display: flex;
      justify-content: end;
      gap: 1rem;
    }
  }
`;
