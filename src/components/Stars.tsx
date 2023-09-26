import { IoStar } from "react-icons/io5";
import styled from "styled-components";
// create the star icons with rating 1 to 5
let starIcons: any[] = [];
for (let i = 0; i < 5; i++) {
  let icons = [];
  for (let j = 0; j <= i; j++) icons.push(<IoStar color="#C7511F" />);
  starIcons.push({ icons });
}
interface Props {
  number?: number;
}
export default function Stars({ number }: Props) {
  // depending on number property, make the star icons
  const stars = starIcons.map(
    (v: any) => v.icons.length === number && <>{v.icons.map((icon: any) => icon)}</>
  );
  return <Box>{stars}</Box>;
}
const Box = styled.div``;
