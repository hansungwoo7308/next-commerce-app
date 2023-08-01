import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setNotify } from "lib/client/store/notifySlice";
import styled from "styled-components";
// import { setTimeoutId, setVisible } from "lib/client/store/notifySlice";
export default function Notify() {
  const notify = useSelector((store: any) => store.notify);
  const notifyRef: any = useRef();
  const { active, status, message } = notify;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (notify.active) {
  //     const timeoutId = setTimeout(() => {
  //       dispatch(setNotify({ active: false }));
  //     }, 3000);
  //   }
  //   // dispatch(setTimeoutId(timeoutId));
  // }, [notify.active]);
  // if (!notify.active) return;
  return (
    <>
      <Box active={active} status={status} ref={notifyRef}>
        <div onMouseOver={() => clearTimeout(notify.timeoutId)}>
          {/* <h3>Notification</h3> */}
          <p>{message || "empty"}</p>
        </div>
        <button
          onClick={() => {
            notifyRef.current.style.display = "none";
            dispatch(setNotify({ active: false }));
            notifyRef.current.style.display = "block";
          }}
        >
          close
        </button>
      </Box>
      {/* <Box status={status}>
        {notify.success && (
          <>
            <h1>success</h1>
            {status === "hidden" && <button onClick={() => setStatus("visible")}>{"<"}</button>}
            {status === "visible" && <button onClick={() => setStatus("hidden")}>{">"}</button>}
          </>
        )}
        {notify.error && (
          <>
            <h1>error</h1>
            {status === "hidden" && <button onClick={() => setStatus("visible")}>{"<"}</button>}
            {status === "visible" && <button onClick={() => setStatus("hidden")}>{">"}</button>}
          </>
        )}
      </Box> */}
    </>
  );
}
type Props = {
  active: boolean;
  status: "success" | "error" | null;
};
const Box = styled.div<Props>`
  width: 15rem;
  height: 8rem;
  position: fixed;
  top: 50px;
  margin-top: 1rem;
  background-color: #000;
  color: green;
  right: ${({ active }) => (active ? "1rem" : "-20rem")};
  /* right: 1rem; */
  border: 2px solid
    ${({ status }) => (status === "success" ? "green" : status === "error" ? "red" : "black")};
  border-radius: 10px;
  transition: all 0.5s;
  padding: 1rem;
  > button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: inherit;
    color: white;
    &:hover {
      background-color: inherit;
      color: green;
    }
  }
`;
