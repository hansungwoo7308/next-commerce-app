import axios from "axios";
import { setLoading } from "lib/client/store/loadingSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGlobe } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function AccountForm() {
  // external
  const auth = useSelector((store: any) => store.auth);
  const dispatch: any = useDispatch();

  // internal
  const router = useRouter();
  const [newImage, setNewImage]: any = useState("");
  const [isEditMode, setIsEditMode]: any = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm();
  const registeredImageProperties = register("image");
  const registeredRoleProperties = register("role", { value: "" });

  const handleUpdateAccountInfo = async (data: any) => {
    console.log({ data });
    return;

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

  if (!auth.user) return null;

  return (
    <Box className="account-form">
      <div className="avatar-outer">
        <div className="avatar">
          {auth.user?.image ? (
            <Image
              src={
                (newImage && URL.createObjectURL(newImage)) ||
                auth.user.image ||
                "/images/placeholder.jpg"
              }
              alt="alt"
              width={300}
              height={300}
            />
          ) : (
            <FcGlobe />
          )}
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
      </div>

      <div className="user-info">
        {isEditMode ? (
          <ul className="user-info-list-edit-mode">
            <li>
              <strong>Name</strong>
              <input {...register("name")} type="text" />
            </li>
            <li>
              <strong>Email</strong>
              <input {...register("email")} type="email" />
            </li>
            <li>
              <strong>Role</strong>
              <div className="role-option">
                <input {...registeredRoleProperties} type="radio" value="admin" id="admin" />
                <label htmlFor="admin">Admin</label>
                <input {...registeredRoleProperties} type="radio" value="user" id="user" />
                <label htmlFor="user">User</label>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="user-info-list">
            <li>
              <strong>Name</strong>
              <p>{auth.user.name}</p>
            </li>
            <li>
              <strong>Email</strong>
              <p>{auth.user.email}</p>
            </li>
            <li>
              <strong>Role</strong>
              <p>{auth.user.role}</p>
            </li>
          </ul>
        )}
        {/* <table>
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
        </table> */}

        <div className="controller">
          {isEditMode ? (
            <>
              <button
                className="cancel-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditMode(false);
                }}
              >
                Cancel
              </button>
              <button className="update-button" onClick={handleSubmit(handleUpdateAccountInfo)}>
                Submit
              </button>
            </>
          ) : (
            <button
              className="edit-button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditMode(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Box>
  );
}

const Box = styled.form`
  display: grid;
  grid-template-areas: "area1 area2";
  gap: 3rem;
  padding: 3rem;
  border: 1px solid;
  border-radius: 10px;
  background-color: #333;

  > * {
    /* border: 3px solid coral; */
  }

  .avatar-outer {
    grid-area: area1;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 10rem;
      height: 10rem;

      position: relative;
      border: 3px solid coral;
      border-radius: 50%;
      overflow: hidden;

      display: flex;
      justify-content: center;
      align-items: center;
      &:hover > .input-outer {
        bottom: 0;
        opacity: 1;
      }

      svg {
        width: 100%;
        height: 100%;
        filter: grayscale(1);
      }

      .input-outer {
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
    }
  }

  .user-info {
    grid-area: area2;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;

    ul {
      display: flex;
      flex-direction: column;
      /* gap: 0.5rem; */

      li {
        width: 15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem;
        /* border: 1px solid; */

        > * {
          padding: 0;
        }

        input {
          width: 10rem;
        }

        .role-option {
          display: flex;
          gap: 10px;

          input[type="radio"] {
            display: none;
            &:checked + label {
              color: #fff;
              background-color: coral;
            }
          }

          label {
            height: 100%;
            border-radius: 2px;
            padding: 2px 5px;
            cursor: pointer;
            font-size: 12px;
            &:hover {
              background-color: black;
            }
          }
        }
      }
    }
  }

  .controller {
    grid-area: area3;
    text-align: end;

    .update-button {
      margin-left: 1rem;
    }
  }
`;