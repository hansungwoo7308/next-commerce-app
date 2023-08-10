import Products from "@/components/Products";
import { styled } from "styled-components";
export default function Pagination({ pages, onChangePage, products }: any) {
  const totalPages = Array(pages)
    .fill(undefined)
    .map((v, i) => i + 1);
  return (
    <Box>
      <h1>Pagination</h1>
      <ul>
        {totalPages?.map((page: any) => (
          <li key={page}>
            <button onClick={() => onChangePage(page)}>{page}</button>
          </li>
        ))}
      </ul>
      <Products products={products} />
    </Box>
  );
}
const Box = styled.div`
  > ul {
    display: flex;
    padding: 1rem;
    border: 2px solid;
    > li {
      padding: 1rem;
      /* border: 2px solid; */
      > button {
        width: 30px;
        height: 30px;
        border: 2px solid;
      }
    }
  }
`;
