import Head from "next/head";
import styled from "styled-components";
import FormSignin from "@/components/form/FormSignin";
export default function Page() {
  return (
    <>
      <Head>
        <title>signin</title>
      </Head>
      <Main>
        <section>
          <FormSignin />
        </section>
      </Main>
    </>
  );
}
const Main = styled.main`
  > section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
