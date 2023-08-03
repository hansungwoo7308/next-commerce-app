import { styled } from "styled-components";
export default function Page() {
  return (
    <Main>
      <section>
        <div>
          <h1>Order List</h1>
        </div>
      </section>
    </Main>
  );
}
const Main = styled.main`
  > section {
    > div {
      border: 2px solid green;
      padding: 1rem;
    }
  }
`;
