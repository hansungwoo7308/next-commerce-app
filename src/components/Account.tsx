import { setNotify } from "lib/client/store/notifySlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
export default function Account() {
  const auth = useSelector((store: any) => store.auth);
  const [toggle, setToggle]: any = useState(false);
  const handleToggle = (e: any) => {
    e.stopPropagation();
    setToggle((value: boolean) => !value);
  };
  useEffect(() => {
    document.addEventListener("click", () => setToggle(false));
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
      <button onClick={handleToggle}>Account ({auth.user.role})</button>
      {/* admin toggle */}
      {toggle && auth.user.role === "admin" && (
        <div className="toggle">
          <Link href={"/my/profile"}>Profile</Link>
          <button>Sign out</button>
        </div>
      )}
      {/* user toggle */}
      {toggle && auth.user.role === "user" && (
        <div className="toggle">
          <Link href={"/my/profile"}>Profile</Link>
          <Link href={"/my/order-list"}>Order List</Link>
          <button>Sign out</button>
        </div>
      )}
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  gap: 1rem;
  > .toggle {
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
      text-align: start;
      /* color: inherit; */
    }
  }
`;
