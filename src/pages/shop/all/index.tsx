import Products from "@/components/Products";
import { getData } from "lib/public/fetchData";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
export async function getServerSideProps({ query }: any) {
  // console.log({ query });
  const response = await getData("products", undefined, query);
  const { products } = response.data;
  return { props: { products } };
}
let renderCount = 0;
export default function index({ products }: any) {
  renderCount++;
  if (!products) return null;
  return (
    <Main>
      <section>
        <div className="all">
          <h1>{renderCount}</h1>
          {/* <Filter /> */}
          {/* <button onClick={handleCheckAll}>{isCheckAll ? "Unselect All" : "Select All"}</button> */}
          {/* <button onClick={handleOpenModal}>Delete</button> */}
          {/* <ul>
            {products?.map((product: any) => (
              // <ProductItem
              //   key={product._id}
              //   product={product}
              //   setProducts={setProducts}
              //   setCheckedProducts={setCheckedProducts}
              //   isCheckAll={isCheckAll}
              // />

              <Product product={product} />
            ))}
          </ul> */}
          <Products products={products} />
          {/* <div className="load-more">
              <button
                onClick={() => {
                  setPage(page + 1);
                  // setFilter({ ...filter, productPage: filter.productPage + 1 });
                  // console.log("filter : ", filter);
                  // setFilter((state: any) => ({
                  //   ...state,
                  //   productPage: state.productPage + 1,
                  // }));
                  router.query.page = page + 1;
                  router.push({ pathname: router.pathname, query: router.query });
                }}
              >
                Load More
              </button>
            </div> */}
        </div>
      </section>
    </Main>
  );
}
const Main = styled.main`
  padding-top: var(--nav-height);
  background-color: var(--color-page-background);
  section {
    min-height: calc(100vh - var(--nav-height));
  }
  .all {
    padding: 1rem;
  }
  /* display: none; */
`;
