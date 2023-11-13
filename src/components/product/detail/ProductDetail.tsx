import { styled } from "styled-components";

import ProductDetailWidget from "@/components/product/detail/ProductDetailWidget";
import ProductDetailReviews from "@/components/product/detail/ProductDetailReviews";
import ProductManagerFixed from "@/components/product/ProductManagerFixed";

export default function ProductDetail({ product }: any) {
  return (
    <Box className="product-detail">
      {/* <ProductDetailWidget product={product} /> */}
      {/* <div className="middle">
        <div className="product-description">
          <h1>Product Description</h1>
          <pre>{product.description}</pre>
        </div>
        <div className="product-detail">
          <h1>Product Detail</h1>
          <ul>
            {product.images.map((image: any, index: number) => (
              <li key={index}>
                <Image src={image.url} width={700} height={700} alt="alt" />
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <ProductDetailReviews product={product} />
      <ProductManagerFixed />
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  > * {
    border: 1px solid;
    border-radius: 10px;
    padding: 1rem;
    background-color: #333;
    pre {
      white-space: pre-wrap;
    }
  }
  > .middle {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    h1 {
      margin-bottom: 1rem;
    }
  }
`;
