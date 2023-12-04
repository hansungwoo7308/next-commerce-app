import { styled } from "styled-components";
import AccountForm from "@/components/form/AccountForm";

export default function Page() {
  return (
    <Main className="my-account-page">
      <section>
        <div className="account-form-outer">
          <h1>Account</h1>
          <AccountForm />
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  .account-form-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 500px) {
    .account-form {
      grid-template-areas: "area1 area1" "area2 area2";
    }
  }
`;
