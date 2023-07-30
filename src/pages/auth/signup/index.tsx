import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// import { useSession } from "next-auth/react";
// import { Main as PublicMain } from "@/styles/public/main.styled";
// import logError from "lib/client/log/logError";
// import logResponse from "lib/client/log/logResponse";
import { useDispatch } from "react-redux";
import { postData } from "lib/public/fetchData";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
// import { postData } from "lib/client/utils/fetchData";
export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { status } = useSession();
  // const [loading, setLoading]: any = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
    reset,
  } = useForm();
  const password = useRef();
  password.current = watch("password");
  const handleSignup = async (data: any) => {
    // console.log("data : ", data);
    console.log({ data });
    try {
      // dispatch(setLoading(true));
      const response: any = await postData("auth/signup", data);
      console.log({ response });
      // dispatch(setNotify({ message: "signed up", visible: true }));
      // dispatch(setLoading(false));
      // reset();
      // setFocus("username");
      // router.push('/auth/signin')
    } catch (error: any) {
      console.log({ error });
      // logError(error);
      // dispatch(setNotify({ message: "failed to sign up", visible: true }));
      // dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    setFocus("username");
  }, []);
  // useEffect(() => {
  //   setFocus("name", { shouldSelect: true });
  // }, [setFocus]);
  // if (status === "authenticated") router.push("/");
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Main>
        <section>
          <form onSubmit={handleSubmit(handleSignup)}>
            <h1>Sign Up</h1>
            <div className="username">
              <input
                {...register("username", {
                  // required: true,
                  required: "This is required",
                  maxLength: 8,
                })}
                className="input"
                type="text"
                placeholder="Name"
              />
              {errors.username && errors.username.type === "required" && (
                <small>This field is required.</small>
              )}
              {errors.username && errors.username.type === "maxLength" && (
                <small>Max Length is 8 character.</small>
              )}
            </div>
            <div className="email">
              <input
                {...register("email", {
                  // required: true,
                  required: "This is required",
                  // maxLength: 10,
                })}
                className="input"
                type="email"
                placeholder="Email"
                autoComplete="off"
              />
              {errors.email && <small>This email field is required.</small>}
            </div>
            <div className="password">
              <input
                {...register("password", {
                  // required: true,
                  required: "This is required",
                  maxLength: 10,
                  // minLength: {
                  //   value: 4,
                  //   message: "Min length is 4",
                  // },
                })}
                className="input"
                type="password"
                placeholder="Password"
              />
              {errors.password && errors.password.type === "required" && (
                <small>This field is required.</small>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <small>Password max length is 10 characters.</small>
              )}
            </div>
            <div className="passwordConfirm">
              <input
                {...register("passwordConfirm", {
                  // required: true,
                  required: "This is required",
                  validate: (passwordConfirm) => {
                    return passwordConfirm === password.current;
                  },
                })}
                className="input"
                type="password"
                placeholder="Password Confirm"
              />
              {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
                <small>This field is required.</small>
              )}
              {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && (
                <small>The password is not matched.</small>
              )}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </section>
      </Main>
    </>
  );
}
const Main = styled.main`
  > section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    > form {
      width: 70%;
      height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 1rem;
      border: 2px solid green;
      background-color: #111;
      > div,
      > button {
        width: 200px;
      }
      input {
        width: 100%;
        padding: 8px;
        outline: none;
        border: 3px solid royalblue;
        /* border: 3px solid steelblue; */
        /* border: 3px solid dodgerblue; */
        border-radius: 5px;
        :hover,
        :focus {
          border: 3px solid var(--color-focus);
        }
      }
      small {
        color: red;
      }
      button {
        /* all: unset; */
        background-color: #444;
        border: none;
        border-radius: 5px;
        padding: 10px;
        margin-top: 30px;
        cursor: pointer;
        &:hover {
          background-color: var(--color-primary);
        }
      }
    }
  }
`;
