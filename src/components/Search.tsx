import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "styled-components";
export default function Search() {
  const [search, setSearch] = useState("");
  const searchRef: any = useRef();
  const router = useRouter();
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch("");
          // router.push(`/search/${search}`);
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button>Search</button>
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
