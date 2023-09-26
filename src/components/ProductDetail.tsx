import ProductDetailWidget from "@/components/ProductDetailWidget";
import { styled } from "styled-components";

export default function ProductDetail({ product }: any) {
  const { ratings } = product;

  return (
    <Box>
      <div className="product-detail">
        {/* <ProductDetailWidget product={product} /> */}
        {/* <div className="middle">
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
        </div> */}
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
