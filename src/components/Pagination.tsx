import { styled } from "styled-components";
export default function Pagination({ pages, page, onChangePage }: any) {
  const totalPages = Array(pages)
    .fill(undefined)
    .map((v, i) => i + 1);
  return (
    <Box>
      <ul className="left">
        <li>
          <button onClick={() => onChangePage(1)}>{"<<"}</button>
        </li>
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (page === 1) return;
              onChangePage(page - 1);
            }}
          >
            {"<"}
          </button>
        </li>
      </ul>
      <ul>
        {totalPages?.map((page: any) => (
          <li key={page}>
            <button onClick={() => onChangePage(page)}>{page}</button>
          </li>
        ))}
      </ul>
      <ul className="right">
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (page === pages) return;
              onChangePage(page + 1);
            }}
          >
            {">"}
          </button>
        </li>
        <li>
          <button onClick={() => onChangePage(pages)}>{">>"}</button>
        </li>
      </ul>
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid green;
  /* padding: 1rem; */
  > ul {
    display: flex;
    /* padding: 1rem; */
    /* border: 2px solid; */
    > li {
      padding: 1rem;
      /* border: 2px solid; */
      > button {
        width: 30px;
        height: 30px;
        border: 2px solid;
        border-radius: 50%;
      }
    }
  }
`;
