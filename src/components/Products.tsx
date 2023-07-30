import Product from "@/components/Product";
import { styled } from "styled-components";
export default function Products({ products }: any) {
  return (
    <Box>
      <ul>
        {products?.map((product: any) => (
          <Product key={product._id} product={product} />
          // <ProductItem
          //   key={product._id}
          //   product={product}
          //   setProducts={setProducts}
          //   setCheckedProducts={setCheckedProducts}
          //   isCheckAll={isCheckAll}
          // />
        ))}
      </ul>
    </Box>
  );
}
const Box = styled.div`
  padding: 1rem;
  border: 2px solid green;
  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: minmax(20rem, auto);
    /* grid-template-rows: repeat(2, minmax(20rem, 1fr)); */
    gap: 1rem;
  }
`;
