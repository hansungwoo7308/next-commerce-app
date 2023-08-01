import { setNotify } from "lib/client/store/notifySlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
export default function Account() {
  const auth = useSelector((store: any) => store.auth);
  const [dropdown, setDropdown]: any = useState(false);

  // test
  const dispatch = useDispatch();
  // test end

  useEffect(() => {
    document.addEventListener("click", () => setDropdown(false));
  }, []);
  if (!auth.user) {
    return (
      <Box>
        <Link href={"/auth/signin"}>Sign in</Link>
        <Link href={"/auth/signup"}>Sign up</Link>
        <div className="auth"></div>
      </Box>
    );
  }
  return (
    <Box>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(!dropdown);
          // test
          dispatch(setNotify({ active: true, status: "success", message: "testing..." }));
          // test end
        }}
      >
        Account ({auth.user.role})
      </button>
      {/* admin dropdown */}
      {dropdown && auth.user.role === "admin" && (
        <div className="dropdown">
          <Link href={"/"}>Account</Link>
          <Link href={"/"}>menu</Link>
          <Link href={"/"}>menu</Link>
          <button>Sign out</button>
        </div>
      )}
      {/* user dropdown */}
      {dropdown && auth.user.role === "user" && (
        <div className="dropdown">
          <Link href={"/"}>Account</Link>
          <Link href={"/"}>Order</Link>
          <button>Sign out</button>
        </div>
      )}
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  gap: 1rem;
  > .dropdown {
    position: absolute;
    top: 100%;
    border: 2px solid red;
    background-color: gray;
    border: none;
    /* margin-top: 10px; */
    > * {
      border: 2px solid red;
    }
    > a,
    button {
      width: 100%;
      padding: 1rem;
      border: none;
      background-color: inherit;
      /* color: inherit; */
    }
  }
`;
