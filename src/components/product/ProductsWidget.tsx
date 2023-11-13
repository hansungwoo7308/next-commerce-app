import Filters from "@/components/product/Filters";
import ProductManager from "@/components/product/ProductManager";
import { useState } from "react";
import styled from "styled-components";

export default function ProductsWidget({ products }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const [widget, setWidget] = useState(null);

  const handleClick = (widget: any) => {
    setIsClicked(true);
    setWidget(widget);
  };

  return (
    <Box>
      <div
        // mobile, tablet 사이즈의 뷰포트일 경우(Depended on CSS Media Query),
        // 클릭이 된 경우(Depended on Flag State),
        className={`product-widget-background ${isClicked ? "visible" : ""}`}
        onClick={() => setIsClicked(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {widget === "filter" ? (
            <Filters />
          ) : widget === "manager" ? (
            <ProductManager products={products} />
          ) : null}
        </div>
      </div>
      <div className="product-widget-opener">
        <button onClick={() => handleClick("filter")}>Filter</button>
        <button onClick={() => handleClick("manager")}>Manager</button>
      </div>
    </Box>
  );
}

const Box = styled.div`
  padding: 0.5rem;
  border: 1px solid coral;
  .product-widget-background {
    padding: 1rem;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-widget-opener {
    display: none;
    text-align: end;
  }
`;
