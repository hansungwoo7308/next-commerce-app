import Slider from "@/components/Slider";
import Head from "next/head";
import { styled } from "styled-components";
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <section id="hero">
          <Slider />
          <div className="card-layout">
            <div className="card">card</div>
            <div className="card">card</div>
            <div className="card">card</div>
            <div className="card">card</div>
            <div className="card">card</div>
          </div>
        </section>
        <section></section>
        <section></section>
        <section></section>
      </Main>
    </>
  );
}
const Main = styled.main`
  .card-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 10rem));
    justify-content: center;
    gap: 1rem;
    background-color: #333;
    padding: 1rem;

    .card {
      /* min-width: 15rem; */
      height: 20rem;
      background-color: #fff;
      color: #000;
    }
  }
`;
