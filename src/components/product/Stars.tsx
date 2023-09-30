import { IoStar } from "react-icons/io5";
import styled from "styled-components";
// create the star icons with rating 1 to 5
// 2중 배열을 만드려고 한다.
let starIconsArrays: any[] = [];
for (let i = 0; i < 5; i++) {
  let starIcons = [];
  for (let j = 0; j <= i; j++) starIcons.push(<IoStar color="#C7511F" />);
  // 스타 아이콘을 담은 아이콘 배열을 푸쉽한다.
  starIconsArrays.push(starIcons);
}
// console.log({ starIconsArrays });
interface Props {
  number?: number;
}
export default function Stars({ number }: Props) {
  // depending on number property, make the star icons
  return (
    <Box>
      {starIconsArrays.map(
        (starIcons: any) =>
          starIcons.length === number &&
          starIcons.map((starIcon: any, index: any) => <span key={number}>{starIcon}</span>)
      )}
    </Box>
  );
}
const Box = styled.div``;
