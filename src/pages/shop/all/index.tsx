import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import ProductMangerByAdmin from "@/components/ProductMangerByAdmin";
import Products from "@/components/Products";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
export async function getServerSideProps({ query }: any) {
  // console.log({ query });
  const { page }: any = query;
  const response = await getData(`v2/products`, "step", query);
  // const response = await getData(`v2/products?page=${page}`);
  const { products, pages } = response.data;
  return { props: { products, pages } };
}
export default function Page({ products, pages }: any) {
  const router = useRouter();
  const [page, setPage]: any = useState(1);
  // const [checked,setChecked]:any=useState([])
  const auth = useSelector((store: any) => store.auth);
  const handleChangePage = (page: any) => {
    setPage(page);
    router.query.page = page;
    router.push({ pathname: router.pathname, query: router.query });
  };
  if (!products) return null;
  return (
    <Main>
      {auth.user?.role === "admin" && <ProductMangerByAdmin />}
      <section className="product-manager-by-admin">
        <div></div>
      </section>
      <section>
        <div className="all">
          {/* <Filter /> */}
          {/* <button onClick={handleCheckAll}>{isCheckAll ? "Unselect All" : "Select All"}</button> */}
          {/* <button onClick={handlesetModal}>Delete</button> */}
          {/* <Products products={products} /> */}
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
      <section></section>
    </Main>
  );
}
const Main = styled.main`
  .product-manager-by-admin {
    /* border: 2px solid blue; */
    max-width: 100%;
    min-height: 100vh;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    pointer-events: none;
    > div {
      width: 80%;
      height: 100vh;
      max-width: 1000px;
      position: relative;
      /* border: 2px solid coral; */
    }
  }
  .all {
    padding: 1rem;
    border: 2px solid green;
    display: none;
  }
`;
