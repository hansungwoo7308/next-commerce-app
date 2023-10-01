import Filters from "@/components/product/Filters";
import Pagination from "@/components/product/Pagination";
import ProductMangerByAdmin from "@/components/product/ProductMangerByAdmin";
import Products from "@/components/product/Products";
import Search from "@/components/layout/Search";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import ProductManger from "@/components/product/ProductManger";
export async function getServerSideProps({ query }: any) {
  const response = await getData(`v2/products`, query);
  const { products, pages } = response.data;
  return { props: { products, pages } };
  // console.log({ query });
  // const { page }: any = query;
  // const response = await getData(`v2/products?page=${page}`);
}
export default function Page({ products, pages }: any) {
  // console.log({ products, pages });
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
      {/* {auth.user?.role === "admin" && <ProductMangerByAdmin />} */}
      {/* <section className="product-manager-by-admin">
        <div></div>
      </section> */}
      <section>
        {/* <Search /> */}
        <div className="all">
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
        <div className="product-outer">
          <div className="left">
            <Filters />
            <ProductManger products={products} />
          </div>
          <div className="right">
            <Products products={products} />
            <Pagination pages={pages} page={page} onChangePage={handleChangePage} />
          </div>
        </div>
      </section>
      <section></section>
    </Main>
  );
}
const Main = styled.main`
  .product-outer {
    height: 100%;
    display: flex;
    > .left {
      padding: 1rem;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    > .right {
      min-height: calc(100vh - 100px);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      /* border: 2px solid; */
      padding: 1rem;
    }
  }
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
    }
  }
`;
