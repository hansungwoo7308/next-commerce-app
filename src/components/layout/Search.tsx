import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setBackground } from "lib/client/store/backgroundSlice";

export default function Search() {
  // external
  const dispatch = useDispatch();

  // internal
  const [search, setSearch] = useState("");
  const searchRef: any = useRef();
  const formRef: any = useRef();
  const router = useRouter();

  useEffect(() => searchRef.current.focus(), []);
  useEffect(
    () =>
      window.addEventListener("click", () => {
        formRef.current.style.outline = "none";
        dispatch(setBackground(false));
      }),
    []
  );

  return (
    <Box ref={formRef}>
      <input
        type="text"
        value={search}
        ref={searchRef}
        placeholder="Search"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setBackground(true));
          formRef.current.style.outline = "2px solid coral";
        }}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(setBackground(false));
          if (!search) return router.push("/products");
          router.query.search = search;
          router.push({ pathname: "/products", query: router.query });
          console.log({ router });
        }}
      >
        <IoIosSearch size={20} color="#000" />
      </button>
    </Box>
  );
}

const Box = styled.form`
  flex: 1;
  display: flex;
  /* gap: 0.5rem; */
  border-radius: 5px;
  overflow: hidden;
  input {
    flex: 1;
    outline: none;
    border: none;
    padding: 10px;
  }
  button {
    /* border: 1px solid red; */
    background-color: #67b34bec;
    &:hover {
      background-color: #67b34bb3;
    }
  }
`;
