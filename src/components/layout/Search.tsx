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
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // const searchRef: any = useRef();
  // useEffect(() => searchRef.current.focus(), []);

  const [previous, setPrevScrollY]: any = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (context) => {
      const latest = window.scrollY;
      setPrevScrollY(latest);

      // scroll down : previous < latest
      if (previous < latest && latest > 200) {
        // hidden
        // dispatch(setBackground(false));
        setIsFocused(false);
      }
    });
  }, [previous, dispatch]);

  return (
    <Box className="search">
      {isFocused && <Background onClick={() => setIsFocused(false)} />}
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
          // }}
          onFocus={() => setIsFocused(true)}
          onClick={() => setIsFocused(true)}
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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.form`
  .search-form {
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    z-index: 2000;
    &.focus {
      outline: 2px solid coral;
    }
  }

  input {
    flex: 1;
    width: 100%;
    min-width: 100px;
    outline: none;
    border: none;
    padding: 10px;
  }

  button {
    width: 3rem;
    /* border: 1px solid red; */
    background-color: #67b34bec;
    &:hover {
      background-color: #67b34bb3;
    }
  }

  @media (max-width: 500px), (width <= 500px) {
    input {
      /* max-width: 5rem; */
    }
  }
`;
