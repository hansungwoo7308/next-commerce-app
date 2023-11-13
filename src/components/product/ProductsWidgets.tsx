import Filters from "@/components/product/Filters";
import ProductManager from "@/components/product/ProductManager";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductsWidgets({ products }: any) {
  const [widget, setWidget] = useState("");

  return (
    <Box>
      <div className="product-widgets WEB">
        <Filters />
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
  border: 1px solid coral;

  .product-widgets-background {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-widgets-opener {
    display: none;
    text-align: end;
  }
`;
