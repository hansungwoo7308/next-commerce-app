import Product from "@/components/product/Product";
import { useState } from "react";
import { styled } from "styled-components";
export default function Products({ products }: any) {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  // console.log({ selectedProductIds });
  return (
    <Box>
      <ul>
        {products?.map((product: any) => (
          <Product
            key={product._id}
            product={product}
            selectedProductIds={selectedProductIds}
            setSelectedProductIds={setSelectedProductIds}
          />
        ))}
      </ul>
    </Box>
  );
}
const Box = styled.div`
  min-height: 500px;
  /* border: 2px solid green; */
  > ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  /* > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: minmax(20rem, auto);
    gap: 1rem;
  } */
`;
