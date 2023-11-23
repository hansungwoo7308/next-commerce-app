import { styled } from "styled-components";

export default function Pagination({ pageCount, page, onPaginate }: any) {
  const totalPages = Array(pageCount)
    .fill(undefined)
    .map((v, i) => i + 1);

  const handleClickLeft = (e: any) => {
    e.preventDefault();
    if (page === 1) return;
    onPaginate(page - 1);
  };

  const handleClickLeftEnd = (e: any) => {
    e.preventDefault();
    onPaginate(1);
  };

  const handleClickRight = (e: any) => {
    e.preventDefault();
    if (page === pageCount) return;
    onPaginate(page + 1);
  };

  const handleClickRightEnd = (e: any) => {
    e.preventDefault();
    onPaginate(pageCount);
  };

  return (
    <Box>
      <ul className="left">
        <li>
          <button onClick={handleClickLeftEnd}>{"<<"}</button>
        </li>
        <li>
          <button onClick={handleClickLeft}>{"<"}</button>
        </li>
      </ul>
      <ul className="center">
        {totalPages?.map((page: any) => (
          <li key={page}>
            <button onClick={() => onPaginate(page)}>{page}</button>
          </li>
        ))}
      </ul>
      <ul className="right">
        <li>
          <button onClick={handleClickRight}>{">"}</button>
        </li>
        <li>
          <button onClick={handleClickRightEnd}>{">>"}</button>
        </li>
      </ul>
    </Box>
  );
}

const Box = styled.div`
  width: fit-content;
  place-self: center;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 10px;
  background-color: #333;
  overflow: hidden;
  /* padding: 1rem; */
  > ul {
    display: flex;
    /* padding: 1rem; */
    > li {
      /* padding: 0.5rem; */
      /* border: 1px solid; */
      > button {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid red; */
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .center {
    border-left: 1px solid;
    border-right: 1px solid;
    /* border-top: 1px solid;
    border-bottom: 1px solid; */
  }
  .left {
    /* border-right: 1px solid; */
    /* border: 1px solid;
    border-radius: 10px 0 0 10px; */
  }
  .right {
    /* border: 1px solid;
    border-radius: 0 10px 10px 0; */
  }
`;
