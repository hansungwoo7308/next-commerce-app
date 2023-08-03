import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "lib/client/store/cartSlice";
import { getData } from "lib/public/fetchData";
import { setNotify } from "lib/client/store/notifySlice";
// import { setNotify, setTimeoutId, setVisible } from "lib/client/store/notifySlice";
export async function getServerSideProps({ params: { id } }: any) {
  console.log({ id });
  const response = await getData(`products/${id}`);
  // const {
  //   data: { product },
  // } = response;
  const { product } = response.data;
  return { props: { product } };
}
export default function Page({ product }: any) {
  console.log({ product });
  const { images, title, price, inStock, sold, description, content } = product;
  const [tabIndex, setTabIndex]: any = useState(0);
  const dispatch = useDispatch();
  const { cart }: any = useSelector((store) => store);
  //   console.log("images : ", images);
  const handleClick = (index: any) => {
    // tabIndex으로부터 변경될 사항
    // setTabIndex(index);
    // event로부터 변경될 사항
    //   const image = e.target;
    //   const images = image.parentNode.childNodes;
    //   const imagesArray = Array.from(images);
    //   imagesArray.map((image: any) => (image.style.border = ""));
    //   image.style.border = "2px solid blue";
  };
  return (
    <Main>
      <section>
        <div className="product">
          <h1 className="name">Product Page</h1>
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
                  className={`${tabIndex === index && "active"}`}
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
            <h3>{title}</h3>
            <h5>${price}</h5>
            <div className="stock-outer">
              {inStock && <h5>InStock : {inStock}</h5>}
              {!inStock && <h5>OutStock</h5>}
              <h5>Sold : {sold}</h5>
            </div>
            <p>{description}</p>
            <p>{content}</p>
            <div className="button-outer">
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
      </section>
    </Main>
  );
}
const Main = styled.main`
  > section {
    > .product {
      display: grid;
      grid-template-areas:
        "name name"
        "images description";
      grid-template-columns: repeat(2, 1fr);
      border: 2px solid green;
      padding: 1rem;
      > * {
        padding: 1rem;
        border: 2px solid;
      }
      .name {
        grid-area: name;
      }
      .images {
        grid-area: images;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .selected-image {
          height: 20rem;
        }
        .unselected-images {
          display: flex;
          > img {
            width: 4rem;
          }
          .active {
            border: 2px solid coral;
          }
        }
      }
      .description {
        grid-area: description;
        display: flex;
        flex-direction: column;
        .stock-outer {
          display: flex;
          justify-content: space-between;
        }
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
    img {
      cursor: pointer;
    }
    button {
      background-color: #777;
      padding: 1rem;
    }
  }
`;
