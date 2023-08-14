import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import Products from "@/components/Products";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
export async function getServerSideProps({ query }: any) {
  // console.log({ query });
  const { page }: any = query;
  const response = await getData(`v2/products`, undefined, query);
  // const response = await getData(`v2/products?page=${page}`);
  const { products, pages } = response.data;
  return { props: { products, pages } };
}
export default function Page({ products, pages }: any) {
  const router = useRouter();
  const [page, setPage]: any = useState(1);
  const handleChangePage = (page: any) => {
    setPage(page);
    router.query.page = page;
    router.push({ pathname: router.pathname, query: router.query });
  };
  if (!products) return null;
  return (
    <Main>
      <section>
        <div className="all">
          {/* <h1>{renderCount}</h1> */}
          {/* <Filter /> */}
          {/* <button onClick={handleCheckAll}>{isCheckAll ? "Unselect All" : "Select All"}</button> */}
          {/* <button onClick={handlesetModal}>Delete</button> */}
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
        <div>
          {/* <h1>Current Page : {page}</h1> */}
          <Filters />
          <Products products={products} />
          <Pagination pages={pages} page={page} onChangePage={handleChangePage} />
        </div>
      </section>
    </Main>
  );
}
const Main = styled.main`
  > section > div {
    /* border: 2px solid blue; */
  }
  .all {
    padding: 1rem;
    border: 2px solid green;
    display: none;
  }
`;
