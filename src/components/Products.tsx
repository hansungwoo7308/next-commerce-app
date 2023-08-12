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
  min-height: 70vh;
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
