import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
export default function ProductMangerByAdmin() {
  const manager = useSelector((store: any) => store.manager);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    console.log({ manager });
  }, [manager]);
  return (
    <Box toggle={toggle}>
      <div>
        <h5>Product Manager</h5>
        {/* <h5>Product Manager By Admin</h5> */}
        {/* {manager.checked} */}
        {manager.checkedItems.map((item: any) => (
          <p>{item.slice(0, 10)}</p>
        ))}
        <p></p>
      </div>
      <div className="button">
        {toggle ? (
          <button onClick={() => setToggle(!toggle)}>{`>`}</button>
        ) : (
          <button onClick={() => setToggle(!toggle)}>{`<`}</button>
        )}
      </div>
    </Box>
  );
}
type Props = { toggle: boolean };
const Box = styled.div<Props>`
  width: 10rem;
  height: 300px;
  background-color: #777;
  color: #fff;
  border: 2px solid green;
  position: fixed;
  top: 50px;
  /* right: 1rem; */
  right: ${({ toggle }) => (toggle ? "1rem" : "-10rem")};
  margin-top: 1rem;
  transition: all 0.5s;
  padding: 1rem;
  border-radius: 10px;
  pointer-events: initial;
  display: flex;
  .button {
    width: 1.5rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2.5rem;
    border: 2px solid green;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    > button {
      width: 100%;
      height: 100%;
      background-color: #777;
      &:hover {
        background-color: var(--color-primary);
        color: #fff;
      }
    }
  }
`;
