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
export default function Page({ products }: any) {
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
  .all {
    padding: 1rem;
  }
  /* display: none; */
`;