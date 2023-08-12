import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { setModal } from "lib/client/store/modalSlice";
export default function Search() {
  const [search, setSearch] = useState("");
  const searchRef: any = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!search) return router.push("/shop/all");
          router.query.search = search;
          router.push({ pathname: router.pathname, query: router.query });
          console.log({ router });
          // setSearch("");
          // router.push(`/search/${search}`);
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button
        // onClick={(e) => {
        //   e.preventDefault();
        //   dispatch(setModal({ active: true, message: "testing...", actionLabel: "test" }));
        // }}
        >
          Search
        </button>
      </form>
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  /* border: 2px solid yellow; */
  form {
    display: flex;
    gap: 0.5rem;
  }
`;
