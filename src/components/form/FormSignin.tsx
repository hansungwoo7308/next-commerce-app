import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { postData } from "lib/public/fetchData";
import { styled } from "styled-components";
import { setCredentials } from "lib/client/store/authSlice";
// import { signIn } from "next-auth/react";
// import logResponse from "lib/client/log/logResponse";
// import logError from "lib/client/log/logError";
// import { setCredentials } from "lib/client/store/authSlice";
// import { postData } from "lib/client/utils/fetchData";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
export default function FormSignin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();
  const handleSigninWithNextauth = async (data: any) => {
    console.log("data: ", data);
    try {
      // // setLoading(true);
      // const response = await signIn("credentials", { ...data, callbackUrl: "/auth/admin" });
      // // logResponse(response);
      // console.log(response);
      // dispatch(setCredentials({ mode: "nextauth", username: "nextauth", accessToken: "nextauth" }));
      // // setLoading(false);
    } catch (error) {
      // logError(error);
      // setLoading(false);
    }
  };
  const handleSignin = async (data: any) => {
    try {
      // dispatch(setLoading(true));
      const response = await postData("auth/signin", data);
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      // const { username, role, image, accessToken } = response.data;
      // logResponse(response);
      // dispatch(
      //   setCredentials({ mode: "general", status: true, username, role, image, accessToken })
      // );
      // dispatch(setLoading(false));
      // dispatch(setNotify({ status: "success", message: "Login Success", visible: true }));
      // router.push("/auth/profile");
    } catch (error) {
      console.log({ error });
      // logError(error);
      // dispatch(setLoading(false));
      // dispatch(setNotify({ status: "error", message: "Login Error", visible: true }));
    }
  };
  useEffect(() => {
    setFocus("email");
  }, []);
  return (
    <Box>
      <h1>Sign In</h1>
      <input {...register("email", { required: true })} type="text" placeholder="email" />
      <input {...register("password", { required: true })} type="password" placeholder="password" />
      <button onClick={handleSubmit(handleSignin)}>Sign in genernally</button>
      <button onClick={handleSubmit(handleSigninWithNextauth)}>Sign in with next-auth</button>
    </Box>
  );
}
const Box = styled.form`
  width: 50%;
  height: 50vh;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: 2px solid green;
  padding: 1rem;
  background-color: var(--color-form-background);
  /* border-radius: 1rem; */
  > input {
    /* width: 50%; */
    width: 200px;
    padding: 8px;
    outline: none;
    border: 3px solid royalblue;
    border-radius: 5px;
    :hover,
    :focus {
      border: 3px solid var(--color-focus);
    }
  }
  > button:nth-of-type(1) {
    background-color: lightcoral;
    color: #fff;
    &:hover {
      background-color: var(--color-primary);
    }
  }
  > button:nth-of-type(2) {
    background-color: lightblue;
    color: #fff;
    &:hover {
      background-color: var(--color-primary);
    }
  }
  > button {
    /* all: unset; */
    width: 200px;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    /* border: none; */
  }
  @media (width<1000px) {
    width: 70%;
    max-width: 500px;
  }
  @media (width<500px) {
    width: 90%;
  }
`;
