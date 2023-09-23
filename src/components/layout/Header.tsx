import Nav from "@/components/Nav";
import { styled } from "styled-components";
export default function Header() {
  return (
    <Box>
      <section>
        <Nav />
      </section>
    </Box>
  );
}
const Box = styled.header`
  > section {
    > .auth {
      display: flex;
    }
  }
`;
