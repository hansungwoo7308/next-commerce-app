import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setLoading } from "lib/client/store/loadingSlice";
import { deleteData } from "lib/public/fetchData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
export default function ProductMangerByAdmin() {
  const manager = useSelector((store: any) => store.manager);
  const auth = useSelector((store: any) => store.auth);
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const payload = { ids: manager.checkedItems };
      const response = await deleteData("v2/products", auth.accessToken, payload);
      logResponse(response);
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    console.log({ manager });
  }, [manager]);
  return (
    <Box toggle={toggle}>
      <div className="button">
        {toggle ? (
          <button onClick={() => setToggle(!toggle)}>{`>`}</button>
        ) : (
          <button onClick={() => setToggle(!toggle)}>{`<`}</button>
        )}
      </div>
      <div>
        <h5>Product Manager</h5>
        <br />
        <p>Checked Items</p>
        {manager.checkedItems.map((item: any) => (
          <p>{item.slice(0, 10)}</p>
        ))}
        <button onClick={handleClick}>Delete these items</button>
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
