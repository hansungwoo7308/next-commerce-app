import Filters from "@/components/product/Filters";
import Pagination from "@/components/product/Pagination";
import Products from "@/components/product/Products";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { setLoading } from "lib/client/store/loadingSlice";
import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/models/Product";
import ProductManager from "@/components/product/ProductManager";

// export async function getServerSideProps(context: any) {
export async function getServerSideProps({ req, query }: any) {
  console.log(`\x1b[33m\n[${req.url}]:::[${req.method}]\x1b[30m`);

  await connectDB();

  // set the pagination conditions
  const ITEMS_PER_PAGE = 3; // 페이지 당 아이템 수
  const page = query.page || 1; // 요청된 페이지
  const skip = (page - 1) * ITEMS_PER_PAGE; // 스킵할 아이템 수

  // set the filter conditions
  let queryCondition: any = {};
  if (query) {
    const { search, category, ratings } = query;
    if (search) queryCondition.name = { $regex: search };
    if (category && category !== "all") queryCondition.category = { $regex: category };
    if (ratings) {
      const ratingsArray = ratings.split("+").map((v: string) => Number(v));
      queryCondition.ratings = { $in: ratingsArray };
    }
  }
  console.log({ query });
  console.log({ queryCondition });

  // excute the query
  const productCount = await Product.countDocuments(queryCondition);
  const products = await Product.find(queryCondition).skip(skip).limit(ITEMS_PER_PAGE);
  const pageCount = Math.ceil(productCount / ITEMS_PER_PAGE);

  console.log({ products, productCount, productCountPerPage: ITEMS_PER_PAGE, pageCount });
  return { props: { products: JSON.parse(JSON.stringify(products)), pageCount } };

  // const response = await getData(`v2/products`, query);
  // const { products, pageCount } = response.data;
  // return { props: { products, pageCount } };
}

export default function Page({ products, pageCount }: any) {
  // console.log({ products, pageCount });

  const router = useRouter();
  const [page, setPage]: any = useState(1);

  const handleChangePage = (page: any) => {
    setPage(page);
    router.query.page = page;
    router.push({ pathname: router.pathname, query: router.query });
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Main>
      <section>
        <div className="product-outer">
          <div
            className={`product-controller ${isVisible ? "visible" : ""}`}
            onClick={() => setIsVisible(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Filters />
              <ProductManager products={products} />
            </div>
          </div>
          <div className="product-controller-opener">
            <button onClick={() => setIsVisible(true)}>Filter</button>
          </div>
          <div className="right">
            <Products products={products} />
            <Pagination pageCount={pageCount} page={page} onChangePage={handleChangePage} />
          </div>
        </div>
      </section>
      <section></section>
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
    </Main>
  );
}

const Main = styled.main`
  .product-outer {
    height: 100%;
    display: flex;
    > .product-controller {
      padding: 1rem;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    > .product-controller-opener {
      display: none;
      border: 1px solid red;
    }
    > .right {
      min-height: calc(100vh - 100px);
      /* flex: 1; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      /* border: 2px solid; */
      padding: 1rem;
    }
    @media (width <= 800px) {
      flex-direction: column;
      .product-controller {
        display: none;
        flex-direction: column;
        z-index: 10000;
        &.visible {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid blue;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .product-controller-opener {
        display: block;
        /* position: sticky;
        top: 0; */
      }
    }
    @media (width <= 500px) {
    }
  }
  /* .product-manager-by-admin {
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
  } */
`;
