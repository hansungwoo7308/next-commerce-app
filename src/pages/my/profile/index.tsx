import Avatar from "@/components/Avatar";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { updateUser } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { patchData } from "lib/public/fetchData";
import { uploadImages } from "lib/public/uploadImages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
export default function Page() {
  const dispatch = useDispatch();
  // state
  const [imageEditMode, setImageEditMode]: any = useState(false);
  const [usernameEditMode, setUsernameEditMode]: any = useState(false);
  const [emailEditMode, setEmailEditMode]: any = useState(false);
  const [roleEditMode, setRoleEditMode]: any = useState(false);
  const [newImage, setNewImage]: any = useState("");
  const [newUsername, setNewUsername]: any = useState("");
  const [newEmail, setNewEmail]: any = useState("");
  const [newRole, setNewRole]: any = useState("");
  // dataset from state
  const dataset = [
    {
      id: "username",
      editMode: usernameEditMode,
      setEditMode: setUsernameEditMode,
      newValue: newUsername,
      setNewValue: setNewUsername,
    },
    {
      id: "email",
      editMode: emailEditMode,
      setEditMode: setEmailEditMode,
      newValue: newEmail,
      setNewValue: setNewEmail,
    },
    {
      id: "role",
      editMode: roleEditMode,
      setEditMode: setRoleEditMode,
      newValue: newRole,
      setNewValue: setNewRole,
    },
  ];
  // user data
  const auth = useSelector((store: any) => store.auth);
  if (!auth.user) return null;
  const { _id, username, email, role, image } = auth.user;
  // handlers
  const handleUpdateNewValue = async (newValueKey: any, newValue: any) => {
    try {
      // console.log({ newValueKey, newValue });
      const payload = { _id, [newValueKey]: newValue };
      console.log({ payload });
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
  const handleUpdateImage = async () => {
    try {
      dispatch(setLoading(true));
      // upload
      const uploadedImage = await uploadImages([newImage]);
      // console.log({ uploadedImage });
      // update
      const payload = { _id, image: uploadedImage[0].secure_url };
      const updatedUser = await patchData("user", payload, auth.accessToken);
      console.log({ updatedUser });
      dispatch(updateUser({ user: updatedUser }));
      dispatch(setLoading(false));
      dispatch(setNotify({ active: true, status: "success", message: "Updated" }));
      // router.push({pathname:router.pathname})
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
      dispatch(setNotify({ active: true, status: "error", message: "Faild" }));
    }
  };
  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    // console.log({ file });
    // setNewImage((state:any)=>[...state,file]);
    setNewImage(file);
  };
  // elements
  const userAvatar = imageEditMode ? (
    // userAvatar EditMode
    <>
      <Avatar image={image} />
      <div className="uploader">
        <input type="file" accept="image/*" name="image" onChange={handleChangeImage} />
        <div className="buttons">
          <button onClick={() => setImageEditMode(false)}>cancel</button>
          <button
            onClick={() => {
              // console.log({ image });
              // console.log({ newImage });
              // for (let v of newImage) console.log({ v });
              handleUpdateImage();
              setImageEditMode(false);
            }}
          >
            save
          </button>
        </div>
      </div>
    </>
  ) : (
    // userAvatar
    <>
      <Avatar image={image} />
      <div className="uploader">
        <button onClick={() => setImageEditMode(true)}>edit</button>
      </div>
    </>
  );
  const userInfo = dataset.map((data: any) => {
    const userInfoEditMode = (
      <>
        <div className="left">
          {data.id === "role" ? (
            <>
              <div>
                <input
                  type="radio"
                  name={data.id}
                  value="admin"
                  id="admin"
                  onChange={(e) => data.setNewValue(e.target.value)}
                />
                <label htmlFor="admin">admin</label>
              </div>
              <div>
                <input
                  type="radio"
                  name={data.id}
                  value="user"
                  id="user"
                  onChange={(e) => data.setNewValue(e.target.value)}
                />
                <label htmlFor="user">user</label>
              </div>
            </>
          ) : (
            <input type="text" name={data.id} onChange={(e) => data.setNewValue(e.target.value)} />
          )}
        </div>
        <div className="right">
          <button onClick={() => data.setEditMode(false)}>cancel</button>
          <button
            onClick={() => {
              // console.log({ "data.newValue": data.newValue });
              handleUpdateNewValue(data.id, data.newValue);
              data.setEditMode(false);
            }}
          >
            save
          </button>
        </div>
      </>
    );
    const userInfo = (
      <>
        <p>
          {data.id === "username" && username}
          {data.id === "email" && email}
          {data.id === "role" && role}
        </p>
        <button onClick={() => data.setEditMode(true)}>edit</button>
      </>
    );
    return <li key={data.id}>{data.editMode ? userInfoEditMode : userInfo}</li>;
  });
  return (
    <Main>
      <section>
        <div className="profile-outer">
          <div className="profile">
            <div className="left">{userAvatar}</div>
            <ul className="right">{userInfo}</ul>
            {/* <li className="username">{usernameEditMode ? contentByEditMode : content}</li> */}
          </div>
        </div>
      </section>
    </Main>
  );
}
const Main = styled.main`
  > section {
    > .profile-outer {
      border: 2px solid green;
      padding: 1rem;
      > .profile {
        border: 2px solid green;
        border-radius: 10px;
        background-color: #333;
        display: flex;
        justify-content: center;
        gap: 3rem;
        padding: 3rem;
        > .left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          > .uploader {
            border: 2px solid;
            border-radius: 5px;
            text-align: center;
            padding: 0.5rem;
            input {
              width: 10rem;
              display: block;
            }
            button {
              padding: 0.5rem;
            }
            .buttons {
              display: flex;
              justify-content: center;
            }
          }
        }
        > .right {
          width: 300px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          /* border: 2px solid; */
          > li {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            border: 2px solid;
            padding: 0.5rem;
            border-radius: 3px;
            .left {
              display: flex;
              gap: 0.5rem;
              label {
                padding: 5px;
              }
            }
            .right {
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
