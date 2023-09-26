import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { styled } from "styled-components";
export default function ProductDetail({ product }: any) {
  const dispatch = useDispatch();

  // get the product data and cart data
  const { name, price, description, category, seller, stock, ratings, images, reviews } = product;
  const cart = useSelector((store: any) => store.cart);

  // product-detail > top
  // set the image index
  const [tabIndex, setTabIndex]: any = useState(0);
  // set the option
  const optionRef: any = useRef(null);
  const handleClickOption = (e: any) => {
    e.stopPropagation();
    const option: HTMLElement = optionRef.current;
    option.classList.toggle("option-list-toggle");
  };
  // close the option ul tag
  useEffect(() => {
    window.addEventListener("click", () => {
      const option: HTMLElement = optionRef.current;
      option.classList.remove("option-list-toggle");
    });
  }, []);

  return (
    <Box>
      <div className="product-detail">
        <div className="top widget">
          <div className="left">
            <div className="selected-image">
              <Image
                src={images[tabIndex].url || images[tabIndex].secure_url}
                alt={images[tabIndex].url || images[tabIndex].secure_url}
                width={1000}
                height={1000}
              />
            </div>
            <div className="unselected-images">
              {images.map((image: any, index: any) => (
                <Image
                  className={`${index === tabIndex ? "active" : ""}`}
                  key={index}
                  src={image.url || image.secure_url}
                  alt={image.url || image.secure_url}
                  width={500}
                  height={500}
                  onMouseEnter={() => setTabIndex(index)}
                  // onClick={() => setTabIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="right">
            <div className="product-name-and-price">
              <h3>{name}</h3>
              <p>price : ${price}</p>
            </div>
            <hr />
            <div className="description">
              <p>category : {category}</p>
              <p>seller : {seller}</p>
              <p>stock : {stock ? "in stock" : "out stock"}</p>
              <p>ratings : {ratings}</p>
              <p>{description}</p>
            </div>
            <div className="delivery">
              <p>Delivery : Free Shipping (CJ 대한통운)</p>
              <small>제주,도서지역 추가 3,000원 / 도서산간지역 추가배송비 발생됩니다</small>
            </div>
            <hr />
            <div className="option-outer">
              <div className="option">
                <a className="option-guide" href="#" onClick={handleClickOption}>
                  Select the item
                </a>
                <ul className="option-list" ref={optionRef}>
                  <li className="option-item">
                    <a href="#">1</a>
                  </li>
                  <li className="option-item">
                    <a href="#">2</a>
                  </li>
                  <li className="option-item">
                    <a href="#">3</a>
                  </li>
                  <li className="option-item">
                    <a href="#">4</a>
                  </li>
                </ul>
              </div>
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
        <div className="middle">
          <div className="product-description">
            <h1>Product Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem voluptatibus
              velit quis labore consequatur maxime commodi ducimus, blanditiis pariatur, fugit iusto
              eum atque inventore tenetur repellendus nesciunt praesentium illum.
            </p>
          </div>
          <div className="product-detail">
            <h1>Product Detail</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem voluptatibus
              velit quis labore consequatur maxime commodi ducimus, blanditiis pariatur, fugit iusto
              eum atque inventore tenetur repellendus nesciunt praesentium illum.
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="reviews">
              <small>{ratings ? ratings + ".0" : ratings}</small>
            </div>
          </div>
          <div className="right">
            <h1>Customers frequently viewed</h1>
          </div>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.div`
  > .product-detail {
    /* border: 2px solid green; */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > * {
      border: 2px solid;
      border-radius: 10px;
      padding: 1rem;
      background-color: #333;
    }
    > .top {
      display: flex;
      > * {
        padding: 1rem;
        /* border: 1px solid; */
      }
      > .left {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .selected-image {
          width: 25rem;
          height: 25rem;
        }
        .unselected-images {
          display: flex;
          gap: 0.5rem;
          > img {
            width: 3rem;
            height: 3rem;
          }
          .active {
            outline: 2px solid black;
          }
        }
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
        > .product-name-and-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        > .description {
          .stock-outer {
            display: flex;
            justify-content: space-between;
          }
        }
        > .option-outer {
          .option {
            position: relative;
            background-color: gray;
            .option-guide {
              width: 100%;
              display: block;
              border: 1px solid #ededed;
              padding: 0.5rem;
            }
            .option-list {
              width: 100%;
              transition: all 1s;
              position: absolute;
              top: 100%;
              background-color: #aaa;
              color: #000;
              border: 1px solid #ededed;
              border-top: none;
              display: none;
              .option-item {
                a {
                  width: 100%;
                  height: 100%;
                  padding: 0.5rem;
                  display: block;
                }
              }
            }
            .option-list-toggle {
              display: block;
            }
          }
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
    > .middle {
    }
    > .bottom {
      display: flex;
      > * {
        border: 1px solid;
        padding: 1rem;
      }

      > .left {
        flex: 0.3;
        > .reviews {
          padding: 1rem;
          border: 1px solid;
        }
      }
      > .right {
        flex: 1;
      }
    }
  }
  img {
    cursor: pointer;
  }
  button {
    background-color: #777;
    padding: 1rem;
  }
`;
