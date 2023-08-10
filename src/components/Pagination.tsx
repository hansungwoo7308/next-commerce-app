import { styled } from "styled-components";
export default function Pagination({ pages, onChangePage }: any) {
  const totalPages = Array(pages)
    .fill(undefined)
    .map((v, i) => i + 1);
  return (
    <Box>
      <ul>
        {totalPages?.map((page: any) => (
          <li key={page}>
            <button onClick={() => onChangePage(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </Box>
  );
}
const Box = styled.div`
  > ul {
    display: flex;
    padding: 1rem;
    border: 2px solid green;
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
