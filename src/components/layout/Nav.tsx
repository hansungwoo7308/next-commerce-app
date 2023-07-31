import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
export default function Nav() {
  const router = useRouter();
  const [shopSub, setShopSub]: any = useState(false);
  // const shopSubRef: any = useRef();
  // useEffect(() => {
  //   if (shopSubRef.current.style.display) shopSubRef.current.style.display = "";
  //   else shopSubRef.current.style.display = "block";
  // }, [shopSub]);
  useEffect(() => {
    document.addEventListener("click", () => setShopSub(false));
  }, []);
  return (
    <Box>
      <ul className="main">
        <li className="home">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="shop">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShopSub(!shopSub);
            }}
          >
            Shop
          </button>
          {shopSub && (
            <ul className="sub">
              {/* 고전적인 방식 (className에 active를 추가) */}
              {/* <ul className={`sub ${shopSub ? "active" : ""}`}> */}
              {/* main의 item이 여러개 일때, 그 item의 sub를 active or unactive 해야할 경우, sub를 선택할 때, useRef를 사용하자 */}
              {/* <ul className="sub" ref={shopSubRef}> */}
              <li>
                <Link href={"/shop/all"}>All Products</Link>
              </li>
              <li>
                <Link href={"/shop/electronics"}>Electronics</Link>
              </li>
              <li>
                <Link href={"/fashion"}>Fashion</Link>
              </li>
              <li>
                <Link href={"/food"}>Food</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </Box>
  );
}
const Box = styled.nav`
  display: flex;
  white-space: nowrap;
  /* border: 2px solid; */
  > .main {
    display: flex;
    gap: 1rem;
    position: relative;
    > li {
      display: flex;
      /* background-color: #333; */
    }
    > .shop {
      > .sub {
        /* display: none; */
        position: absolute;
        top: 100%;
        background-color: gray;
        margin-top: 10px;
      }
      /* > .sub.active {
        display: block;
      } */
      /* &:hover > .sub {
        display: block;
      } */
    }
  }
  /* public */
  .sub > li > a {
    padding: 1rem;
  }
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