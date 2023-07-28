import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "styled-components";
export default function Nav() {
  const router = useRouter();

  return (
    <Box>
      <ul className="main-menu">
        <li className="home">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="shop">
          <Link href={"/shop"}>Shop</Link>
          <ul className="sub-menu">
            <li>
              <Link href={"/test"}>Test</Link>
            </li>
            <li>
              <Link href={"/test"}>Test</Link>
            </li>
            <li>
              <Link href={"/test"}>Test</Link>
            </li>
          </ul>
        </li>
      </ul>
    </Box>
  );
}
const Box = styled.nav`
  /* border: 2px solid; */
  > .main-menu {
    /* height: 100%; */
    display: flex;
    gap: 1rem;
    position: relative;
    > * {
      /* border: 2px solid; */
      background-color: #333;
    }
    > .shop {
      > .sub-menu {
        display: none;
        position: absolute;
        top: 100%;
        border: 2px solid blue;
        background-color: gray;
      }
      &:hover > .sub-menu {
        display: block;
      }
    }
  }
  /* public */
`;

// pages structure
// 종합적인 쇼핑몰이라면, 대분류에서 먼저 사용자가 보고 제품을 찾아갈 수 있게 한다.
// home > collections > clothes (extensive internal linking)
// collections
// all products
// shop all
// category

// 특정한 주제가 있는 쇼핑몰이라면 (신발, 의류, 화장품)
// brands
