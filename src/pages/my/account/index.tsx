import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
export default function Page() {
  const auth = useSelector((store: any) => store.auth);
  if (!auth.user) return null;
  const { username, email, role, image } = auth.user;
  const [usernameEditMode, setUsernameEditMode]: any = useState(false);
  const [newUsername, setNewUsername]: any = useState("");
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  useEffect(() => {
    console.log({ newUsername });
  }, [newUsername]);
  return (
    <Main>
      <section>
        <div className="my-account">
          <div className="my-account-info">
            <Image src={image} alt="profile-image" width={300} height={300} />
            <ul>
              <li className="username">
                {usernameEditMode ? (
                  <>
                    <input
                      name="username"
                      type="text"
                      placeholder={username}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <div className="buttons">
                      <button onClick={() => setUsernameEditMode(false)}>cancel</button>
                      <button onClick={() => setUsernameEditMode(false)}>save</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{username}</p>
                    <button onClick={() => setUsernameEditMode(true)}>edit</button>
                  </>
                )}
              </li>
              <li className="email">
                <p>{email}</p>
              </li>
            </ul>
          </div>
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
      > .my-account-info {
        border: 2px solid;
        display: flex;
        gap: 1rem;
        padding: 1rem;
        img {
          width: 150px;
          border-radius: 50%;
        }
        > ul {
          width: 300px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          > li {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            border: 2px solid;
            padding: 0.5rem;
            border-radius: 3px;
            .buttons {
              display: flex;
              gap: 0.5rem;
            }
          }
        }
      }
      button {
        background-color: initial;
      }
    }
  }
`;
