import Image from "next/image";
import { styled } from "styled-components";
export default function Avatar({ image }: any) {
  return (
    <Box>
      <Image src={"/placeholder.jpg"} alt="profile-image" width={300} height={300} />
      {/* <Image src={image||'/placeholder.jpg'} alt="profile-image" width={300} height={300} /> */}
    </Box>
  );
}
const Box = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 50%;
  }
`;
