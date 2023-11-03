import styled from "styled-components";
import { getData } from "lib/public/fetchData";
import ProductDetail from "@/components/product/ProductDetail";
import Product from "lib/server/models/Product";
import connectDB from "lib/server/config/connectDB";

export async function getStaticPaths(context: any) {
  console.log(`\x1b[33m\n[pages/products/[id]]:::[getStaticPaths]\x1b[30m`);

  await connectDB();

  const products = await Product.find({}).select("_id").exec();
  const productIds = products.map((product) => product._id.toString());
  // console.log({ productIds });
  const paths = productIds.map((productId: any) => ({ params: { id: productId } }));

  return {
    // paths: [{ params: { id: "123" } }],
    paths,
    fallback: true,
    // fallback: false,
    // fallback: "blocking",
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params;
  console.log(`\x1b[33m\n[pages/products/${id}]:::[getStaticProps]\x1b[30m`);
  const response = await getData(`v2/products/${id}`);
  const { product } = response.data;
  // console.log({ product });

  return { props: { product } };
}

// export async function getServerSideProps({ query }: any) {
//   // params.id === query.id
//   const { id } = query;
//   const response = await getData(`v2/products/${id}`);
//   const { product } = response.data;
//   return { props: { product } };
// }

export default function Page({ product }: any) {
  // console.log({ product });

  if (!product) return null;

  return (
    <Main>
      <section>
        <ProductDetail product={product} />
      </section>
    </Main>
  );
}

const Main = styled.main``;
