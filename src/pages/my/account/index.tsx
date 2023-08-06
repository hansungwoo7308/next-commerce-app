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
  const [emailEditMode, setEmailEditMode]: any = useState(false);
  const [roleEditMode, setRoleEditMode]: any = useState(false);
  const [newUsername, setNewUsername]: any = useState("");
  const [newEmail, setNewEmail]: any = useState("");
  const [newRole, setNewRole]: any = useState("");
  // const [imageEditMode, setImageEditMode]: any = useState(false);
  // const [newImage, setNewImage]: any = useState("");
  const dataset = [
    {
      id: "username",
      mode: usernameEditMode,
      setMode: setUsernameEditMode,
      newValue: newUsername,
      setNewValue: setNewUsername,
    },
    {
      id: "email",
      mode: emailEditMode,
      setMode: setEmailEditMode,
      newValue: newEmail,
      setNewValue: setNewEmail,
    },
    {
      id: "role",
      mode: roleEditMode,
      setMode: setRoleEditMode,
      newValue: newRole,
      setNewValue: setNewRole,
    },
    // {
    //   id: "image",
    //   mode: imageEditMode,
    //   setMode: setImageEditMode,
    //   newValue: newImage,
    //   setNewValue: setNewImage,
    // },
  ];
  const dispatch = useDispatch();
  if (!auth.user) return null;
  const { _id, username, email, role, image } = auth.user;
  const handleUpdateNewValue = async (newValueKey: any, newValue: any) => {
    try {
      // console.log({ newValueKey, newValue });
      const payload = { _id, [newValueKey]: newValue };
      // console.log({ payload });
      // updateUser(payload);
      const response = await patchData("user", payload, auth.accessToken);
      const { updatedUser } = response.data;
      // out
      logResponse(response);
      dispatch(updateUser({ user: updatedUser }));
    } catch (error) {
      logError(error);
    }
  };
  // const handleUpdateNewUsername = async () => {
  //   try {
  //     const payload = { _id, username: newUsername };
  //     // updateUser(payload);
  //     const response = await patchData("user", payload, auth.accessToken);
  //     const { updatedUser } = response.data;
  //     // out
  //     logResponse(response);
  //     dispatch(updateUser({ user: updatedUser }));
  //     setUsernameEditMode(false);
  //   } catch (error) {
  //     logError(error);
  //   }
  // };
  // const contentByEditMode = (
  //   <>
  //     <input
  //       name="username"
  //       type="text"
  //       // autoComplete="off"
  //       // placeholder={username}
  //       onChange={(e) => setNewUsername(e.target.value)}
  //     />
  //     <div className="buttons">
  //       <button onClick={() => setUsernameEditMode(false)}>cancel</button>
  //       <button onClick={handleUpdateNewUsername}>save</button>
  //     </div>
  //   </>
  // );
  // const content = (
  //   <>
  //     <p>{username}</p>
  //     <button onClick={() => setUsernameEditMode(true)}>edit</button>
  //   </>
  // );
  const content = dataset.map((data: any) => (
    <li key={data.id}>
      {data.mode ? (
        <>
          <input type="text" name={data.id} onChange={(e) => data.setNewValue(e.target.value)} />
          <div className="buttons">
            <button onClick={() => data.setMode(false)}>cancel</button>
            <button
              onClick={() => {
                console.log({ "data.newValue": data.newValue });
                handleUpdateNewValue(data.id, data.newValue);
                data.setMode(false);
              }}
            >
              save
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            {data.id === "username" && username}
            {data.id === "email" && email}
            {data.id === "role" && role}
            {data.id === "image" && image}
          </p>
          <button onClick={() => data.setMode(true)}>edit</button>
        </>
      )}
    </li>
  ));
  return (
    <Main>
      <section>
        <div className="my-account">
          <div className="my-account-info">
            <div className="image-outer">
              <Image src={image} alt="profile-image" width={300} height={300} />
            </div>
            {/* <Image src={image} alt="profile-image" width={300} height={300} /> */}
            <ul>
              {content}
              {/* <li className="username">{usernameEditMode ? contentByEditMode : content}</li> */}
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
        border: 2px solid green;
        border-radius: 10px;
        background-color: #333;
        display: flex;
        justify-content: center;
        gap: 3rem;
        padding: 3rem;
        > .image-outer {
          width: 150px;
          height: 150px;
          img {
            border-radius: 50%;
          }
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
