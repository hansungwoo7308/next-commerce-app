import ImageViewer from "@/components/product/ImageViewer";
import Stars from "@/components/product/Stars";
import Option from "@/components/product/Option";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setNotify } from "lib/client/store/notifySlice";
import { addToCart } from "lib/client/store/cartSlice";

interface Props {
  product?: any;
}

export default function ProductDetailWidget({ product }: Props) {
  const dispatch = useDispatch();

  // get the product data and cart data
  const { name, price, description, category, seller, stock, ratings, images, reviews } = product;
  const cart = useSelector((store: any) => store.cart);

  return (
    <Box>
      <div className="top widget">
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
                <span>{ratings + ".0"}</span>
                <Stars number={ratings} />
              </div>
            </div>
          </div>
          <hr />
          <div className="description">
            <p>category : {category}</p>
            <p>seller : {seller}</p>
            <p>stock : {stock ? "in stock" : "out stock"}</p>
          </div>
          <div className="delivery">
            <p>Delivery : Free Shipping (CJ 대한통운)</p>
            <small>제주,도서지역 추가 3,000원 / 도서산간지역 추가배송비 발생됩니다</small>
          </div>
          <hr />
          <div className="option-outer">
            <Option />
          </div>
          <div className="bottom-outer ">
            <strong>총 상품금액 :</strong>
            <button
              onClick={() => {
                const duplicate = cart.find((v: any) => v._id === product._id);
                // console.log("duplicate:", duplicate);
                if (duplicate) {
                  console.log("duplicated");
                  dispatch(setNotify({ active: true, status: "error", message: "Duplicated" }));
                  // dispatch(setNotify({ status: "error", message: duplicate._id, visible: true }));
                  // const timeout = setTimeout(() => {
                  //   dispatch(setVisible(false));
                  // }, 3000);
                  // dispatch(setTimeoutId(timeout));
                  return;
                } else {
                  return dispatch(addToCart({ ...product, quantity: 1 }));
                }
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.div`
  > .top {
    display: flex;
    > * {
      padding: 1rem;
      /* border: 1px solid; */
    }
    > .left {
    }
    > .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      /* border: 2px solid red; */
      > * {
        /* border: 2px dashed; */
      }
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
      > .option-outer {
      }
      > .bottom-outer {
        flex: 1;
        display: flex;
        flex-direction: column;
        /* justify-content: end; */
        justify-content: space-between;
        button {
          align-self: end;
          &:hover {
            background-color: #fff;
            color: #000;
          }
        }
      }
    }
  }
`;
