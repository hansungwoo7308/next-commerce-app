import axios from "axios";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { updateUser } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import { patchData } from "lib/public/fetchData";
import { uploadImages } from "lib/public/uploadImages";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { styled } from "styled-components";

export default function Page() {
  const dispatch: any = useDispatch();
  const router = useRouter();
  // external
  const auth = useSelector((store: any) => store.auth);
  // internal
  const [newImage, setNewImage]: any = useState("");
  const [isEditMode, setIsEditMode]: any = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();
  const registeredImageProperties = register("image");
  const registeredRoleProperties = register("role", { value: "" });

  const handleUpdateAccountInfo = async (data: any) => {
    console.log({ data });

    try {
      dispatch(setLoading(true));
      // set the formData
      const formData: any = new FormData();
      formData.append("images", data.image);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", data.role);

      // request
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:3000/api/v2/user/multipart`,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        // data,
      });

      // out
      console.log({ response });
      refreshAuth(dispatch);
      dispatch(setLoading(false));
      setIsEditMode(false);
      // router.push({ pathname: router.asPath });
    } catch (error) {
      dispatch(setLoading(false));
      console.log({ error });
    }
  };
  const handleClickEditButton = (e: any) => {
    e.preventDefault();
    setIsEditMode(true);
  };
  const handleClickCancelButton = (e: any) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  // const handleUpdateNewValue = async (newValueKey: any, newValue: any) => {
  //   try {
  //     // console.log({ newValueKey, newValue });
  //     const payload = { _id, [newValueKey]: newValue };
  //     // console.log({ payload });
  //     // updateUser(payload);
  //     const response = await patchData("user", payload, auth.accessToken);
  //     // out
  //     logResponse(response);
  //     refreshAuth(dispatch);
  //   } catch (error) {
  //     logError(error);
  //   }
  // };
  // const handleUpdateImage = async () => {
  //   try {
  //     dispatch(setLoading(true));
  //     // upload
  //     const uploadedImage = await uploadImages([newImage]);
  //     // console.log({ uploadedImage });
  //     // update
  //     const payload = { _id, image: uploadedImage[0].secure_url };
  //     const response = await patchData("user", payload, auth.accessToken);
  //     const { updatedUser } = response.data;
  //     logResponse(response);
  //     dispatch(updateUser({ user: updatedUser }));
  //     dispatch(setLoading(false));
  //     toast.success("Successfully uploaded");
  //     // router.push({pathname:router.pathname})
  //   } catch (error) {
  //     logError(error);
  //     dispatch(setLoading(false));
  //     toast.error("Failed uploading");
  //   }
  // };
  // const handleChangeImageFiles = (e: any) => {
  //   const file = e.target.files[0];
  //   // setNewImage((state:any)=>[...state,file]);
  //   setNewImage(file);
  // };

  // const controllerRef: any = useRef();
  // useEffect(() => {
  //   if (!controllerRef.current) return;
  //   if (setIsEditMode) controllerRef.current.style.background = "#777";
  //   else controllerRef.current.style.background = "#333";
  // }, [isEditMode]);

  if (!auth.user) return null;
  return (
    <Main>
      <section>
        {/* <form>
          <div className="profile">
            <div className="left">
              <div className="avatar">
                <Image
                  src={
                    (newImage && URL.createObjectURL(newImage)) ||
                    image ||
                    "/images/placeholder.jpg"
                  }
                  alt="profile-image"
                  width={300}
                  height={300}
                />
                <div className="input-outer">
                  <input
                    type="file"
                    accept="image/*"
                    name={registeredImageProperties.name}
                    onChange={(e: any) => {
                      // registeredImageProperties.onChange(e);
                      // console.log({ some: e.target.value, some2: e.target.files });
                      const newImage = e.target.files[0];
                      setValue("image", newImage);
                      setNewImage(newImage);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <ul>{userInfo}</ul>
              <button onClick={handleSubmit(handleUpdateAccountInfo)}>Submit for saving</button>
            </div>
          </div>
        </form> */}
        <div className="account">
          <form>
            <div className="account-form-content">
              <div className="left component">
                <div className="avatar">
                  <Image
                    src={
                      (newImage && URL.createObjectURL(newImage)) ||
                      auth.user.image ||
                      "/images/placeholder.jpg"
                    }
                    alt="profile-image"
                    width={300}
                    height={300}
                  />
                  <div className="input-outer">
                    <input
                      type="file"
                      accept="image/*"
                      name={registeredImageProperties.name}
                      onChange={(e: any) => {
                        // registeredImageProperties.onChange(e);
                        // console.log({ some: e.target.value, some2: e.target.files });
                        const newImage = e.target.files[0];
                        setValue("image", newImage);
                        setNewImage(newImage);
                        setIsEditMode(true);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="uploader">{userAvatar}</div> */}
              </div>
              <div className="right component">
                {isEditMode ? (
                  <table>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>
                          <input {...register("name")} type="text" />
                        </td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>
                          <input {...register("email")} type="email" />
                        </td>
                      </tr>
                      <tr>
                        <th>Role</th>
                        <td>
                          <div className="radio-inputs">
                            <input
                              {...registeredRoleProperties}
                              type="radio"
                              value="admin"
                              id="admin"
                            />
                            <label htmlFor="admin">
                              <p>Admin</p>
                            </label>
                            <input
                              {...registeredRoleProperties}
                              type="radio"
                              value="user"
                              id="user"
                            />
                            <label htmlFor="user">
                              <p>User</p>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{auth.user.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{auth.user.email}</td>
                      </tr>
                      <tr>
                        <th>Role</th>
                        <td>{auth.user.role}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div
              className="account-form-controller component"
              style={{ background: isEditMode ? "#777" : "#333" }}
            >
              {isEditMode ? (
                <div>
                  <button className="cancel-button" onClick={handleClickCancelButton}>
                    Cancel
                  </button>
                  <button className="update-button" onClick={handleSubmit(handleUpdateAccountInfo)}>
                    Submit
                  </button>
                </div>
              ) : (
                <div>
                  <button className="edit-button" onClick={handleClickEditButton}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  > section {
    > .account {
      /* border: 2px solid green; */
      padding: 1rem;
      > form {
        width: 500px;
        margin: auto;
        /* padding: 1rem; */
        /* border: 2px solid yellow; */
        display: flex;
        flex-direction: column;
        gap: 1rem;
        tr,
        td {
          border: 1px solid;
        }

        input {
          width: 100%;
        }
        .radio-inputs {
          display: flex;
          gap: 1rem;
          input[type="radio"] {
            display: none;
            &:checked + label {
              color: #fff;
              background-color: #000;
            }
          }
          label {
            border: 1px solid;
            border-radius: 7px;
            padding: 3px 7px;
            cursor: pointer;
          }
        }
      }
      .component {
        border: 2px solid;
        border-radius: 10px;
        padding: 1rem;
        background-color: #333;
      }
      .account-form-content {
        display: flex;
        gap: 1rem;
        > .left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          /* border: 1px solid red; */
          > .avatar {
            position: relative;
            width: 12rem;
            height: 12rem;
            border: 5px solid;
            border-radius: 50%;
            overflow: hidden;
            > .input-outer {
              position: absolute;
              bottom: -50%;
              left: 0;
              width: 100%;
              height: 50%;
              background-color: rgba(0, 0, 0, 0.5);
              color: coral;
              opacity: 0;
              transition: all 0.5s;
            }
            &:hover > .input-outer {
              bottom: 0;
              opacity: 1;
            }
          }
        }
        > .right {
          flex: 1;
          display: flex;
          table {
            width: 100%;
            line-height: 2rem;
            border-collapse: collapse;
            /* border: 1px solid; */
            th,
            td {
              /* border: 1px solid; */
              padding: 0.5rem;
            }
            th {
              width: 20%;
            }
          }
        }
      }
      .account-form-controller {
        text-align: end;
      }
    }
    button {
      background-color: initial;
    }
  }
`;
