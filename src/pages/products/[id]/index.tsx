import styled from "styled-components";
import { getData } from "lib/public/fetchData";
import ProductDetail from "@/components/ProductDetail";
// import { setNotify, setTimeoutId, setVisible } from "lib/client/store/notifySlice";
export async function getServerSideProps({ query }: any) {
  // params.id === query.id
  const { id } = query;
  const response = await getData(`v2/products/${id}`);
  const { product } = response.data;
  return { props: { product } };
}
export default function Page({ product }: any) {
  // console.log({ product });
  return (
    <Main>
      <section>
        <ProductDetail product={product} />
      </section>
    </Main>
  );
}
const Main = styled.main``;
