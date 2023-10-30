import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Background() {
  const background = useSelector((store: any) => store.background);
  // if (!background) return null;
  // return <Box/>
  return background ? <Box /> : null;
}

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
