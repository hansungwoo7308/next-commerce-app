import Filters from "@/components/product/Filters";
import Filters2 from "@/components/product/Filters2";
import ProductManager from "@/components/product/ProductManager";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductsWidgets({ products }: any) {
  const [widget, setWidget] = useState("");

  return (
    <Box>
      <div className="product-widgets WEB">
        {/* <Filters /> */}
        <Filters2 />
        <ProductManager products={products} />
      </div>

      <div className="product-widgets-outer MOBILE">
        <div
          // mobile, tablet 사이즈의 뷰포트일 경우(Depended on CSS Media Query),
          // 클릭이 된 경우(Depended on Flag State),
          className={`product-widgets-background ${widget ? "visible" : ""}`}
          onClick={() => setWidget("")}
        >
          <div className="product-widgets" onClick={(e) => e.stopPropagation()}>
            {widget === "filter" ? (
              <Filters />
            ) : widget === "manager" ? (
              <ProductManager products={products} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="product-widgets-opener">
          <button onClick={() => setWidget("filter")}>Filter</button>
          <button onClick={() => setWidget("manager")}>Manager</button>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid coral; */

  .product-widgets.WEB {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-widgets-outer.MOBILE {
    display: none;

    .product-widgets-background {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      &.visible {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    .product-widgets-opener {
      text-align: end;
      padding: 0 1rem;
      background-color: #333;
      border: 1px solid;
      border-radius: 10px;
      /* border: 1px solid red; */

      /* position: sticky;
            top: 0; */
    }
  }
`;
