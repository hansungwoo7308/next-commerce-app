import { setBackground } from "lib/client/store/backgroundSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function Background() {
  // const dispatch = useDispatch();

  const background = useSelector((store: any) => store.background);
  // const children = useSelector((store: any) => store.children);

  // if (!background) return null;
  // return <Box/>
  // return background ? <Box /> : null;

  // if (children.length) {
  //   console.log({ children });
  //   return (
  //     <Box onClick={() => dispatch(setBackground(false))}>
  //       {children.map((child: any) => (
  //         <>{child}</>
  //       ))}
  //     </Box>
  //   );
  // }
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

  display: flex;
  justify-content: center;
  align-items: center;
`;
