import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setCredentials, updateUser } from "lib/client/store/authSlice";
import { useGetUserQuery, useUpdateUserMutation } from "lib/client/store/userApiSlice";
import { getData, patchData } from "lib/public/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
export default function Page() {
  const auth = useSelector((store: any) => store.auth);
  const [usernameEditMode, setUsernameEditMode]: any = useState(false);
  const [newUsername, setNewUsername]: any = useState("");
  // const { data, isLoading, isSuccess, isError, error }: any = useGetUserQuery();
  // const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  if (!auth.user) return null;
  const { _id, username, email, role, image } = auth.user;
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // useEffect(() => {
  //   console.log({ newUsername });
  // }, [newUsername]);
  const handleUpdateNewUsername = async () => {
    try {
      const payload = { _id, username: newUsername };
      // updateUser(payload);
      const response = await patchData("user", payload, auth.accessToken);
      const { updatedUser } = response.data;
      logResponse(response);
      // accessToken을 무효화하여 layout component에 등록된 refreshAuth에 의해서 refreshing한다.
      // dispatch(setCredentials({ accessToken: null }));
      dispatch(updateUser({ user: updatedUser }));
      setUsernameEditMode(false);
    } catch (error) {
      logError(error);
    }
  };
  const test = async () => {
    try {
      const params = { _id };
      const response = await getData("user", auth.accessToken, params);
      logResponse(response);
    } catch (error) {
      logError(error);
    }
  };
  return (
    <Main>
      <section>
        <div className="my-account">
          <div className="my-account-info">
            <Image src={image} alt="profile-image" width={300} height={300} />
            <ul>
              <li className="username">
                {auth.user && usernameEditMode ? (
                  <>
                    <input
                      name="username"
                      type="text"
                      // placeholder={username}
                      // value={newUsername}
                      autoComplete="off"
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <div className="buttons">
                      <button onClick={() => setUsernameEditMode(false)}>cancel</button>
                      <button onClick={handleUpdateNewUsername}>save</button>
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
        <button
          onClick={() => {
            test();
          }}
        >
          test
        </button>
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
