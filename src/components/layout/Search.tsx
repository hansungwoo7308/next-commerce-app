import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "lib/client/store/backgroundSlice";
import Background from "@/components/layout/Background";

export default function Search() {
  // external
  const dispatch = useDispatch();

  // internal
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");

  // const searchRef: any = useRef();
  // useEffect(() => searchRef.current.focus(), []);

  const router = useRouter();

  return (
    <Box className="search">
      {/* <Background onClick={() => setIsFocused(false)} /> */}
      <div className={`search-form ${isFocused ? "focus" : ""}`}>
        <input
          type="text"
          value={search}
          placeholder="Search"
          // ref={searchRef}
          // onClick={(e) => {
          //   console.log("onClick");
          //   e.stopPropagation();
          //   dispatch(setBackground(true));
          //   setIsFocused(true);
          //   // formRef.current.style.outline = "2px solid coral";
          // }}
          onFocus={() => {
            // console.log("onFocus");
            dispatch(setBackground(true));
            setIsFocused(true);
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
      </div>
    </Box>
  );
}

const Box = styled.form`
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
  }

  .search-form {
    /* flex: 1; */
    display: flex;
    /* gap: 0.5rem; */
    border-radius: 5px;
    overflow: hidden;
    /* border: 2px solid green; */
    position: relative;
    z-index: 200;
    &.focus {
      outline: 2px solid coral;
    }
  }

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

  @media (max-width: 500px), (width <= 500px) {
    input {
      max-width: 100px;
    }
  }
`;
