import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { styled } from "styled-components";
export default function ProductDetail({ product }: any) {
  const { name, price, description, category, seller, stock, ratings, images, reviews } = product;
  const [tabIndex, setTabIndex]: any = useState(0);
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();
  return (
    <Box>
      <div className="product-detail">
        <div className="top">
          <div className="widget">
            <div className="images">
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
                    className={`${index === tabIndex && "active"}`}
                    key={index}
                    src={image.url || image.secure_url}
                    alt={image.url || image.secure_url}
                    width={500}
                    height={500}
                    onClick={() => setTabIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="description">
              <div className="top">
                <h3>{name}</h3>
                <p>price : ${price}</p>
              </div>
              <div className="middle">
                <p>category : {category}</p>
                <p>seller : {seller}</p>
                <p>stock : {stock ? "in stock" : "out stock"}</p>
                <p>ratings : {ratings}</p>
                <p>{description}</p>
              </div>
              <div className="bottom">
                <div className="button-outer">
                  <button
                    onClick={() => {
                      const duplicate = cart.find((v: any) => v._id === product._id);
                      // console.log("duplicate:", duplicate);
                      if (duplicate) {
                        console.log("duplicated");
                        dispatch(
                          setNotify({ active: true, status: "error", message: "Duplicated" })
                        );
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
              {/* <p>{content}</p> */}
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
          <div>
            <h1>Customers frequently viewed</h1>
          </div>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.div`
  > .product-detail {
    border: 2px solid green;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > * {
      border: 2px solid green;
      border-radius: 10px;
      padding: 1rem;
      background-color: #333;
    }
    > .top {
      > .widget {
        display: flex;
        > * {
          flex: 1;
          padding: 1rem;
        }
        .images {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .selected-image {
            height: 20rem;
          }
          .unselected-images {
            display: flex;
            gap: 0.5rem;
            > img:hover {
              outline: 2px solid white;
            }
            > img {
              width: 4rem;
            }
            .active {
              outline: 2px solid green;
            }
          }
        }
        .description {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          /* border: 2px solid coral; */
          > * {
            /* border: 2px solid; */
          }
          > .top {
          }
          > .middle {
            flex: 1;
            .stock-outer {
              display: flex;
              justify-content: space-between;
            }
          }
          > .bottom {
            .button-outer {
              flex: 1;
              display: flex;
              justify-content: flex-end;
              /* border: 2px solid red; */
              button {
                place-self: end;
              }
            }
          }
        }
      }
    }
    > .middle {
    }
    > .bottom {
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
