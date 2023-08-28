import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { postData } from "lib/public/fetchData";
import { styled } from "styled-components";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
// import logResponse from "lib/client/log/logResponse";
// import logError from "lib/client/log/logError";
// import { setCredentials } from "lib/client/store/authSlice";
// import { postData } from "lib/client/utils/fetchData";
// import { setLoading, setNotify } from "lib/client/store/notifySlice";
export default function FormSignin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const session: any = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();
  const handleSigninWithNextauth = async (data: any) => {
    // console.log("data: ", data);
    try {
      setLoading(true);
      const { email, password } = data;
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
        // callbackUrl: "/my/profile",
      });
      console.log({ response });
      setLoading(false);
      toast.success("Login Success (next-auth)");
      const { callbackUrl }: any = router.query;
      router.push(callbackUrl);
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
      toast.error(error.message);
    }
  };
  const handleSignin = async (data: any) => {
    try {
      // dispatch(setLoading(true));
      const response = await postData("auth/signin", data);
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      // dispatch(setLoading(false));
      // dispatch(setNotify({ status: "success", message: "Login Success", visible: true }));
      // router.push("/auth/profile");
      router.push("/my/profile");
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
  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     // console.log({ session });
  //     const user = {
  //       username: session.data.user?.name,
  //       email: session.data.user?.email,
  //       image: session.data.user?.image,
  //       role: session.data.user?.role,
  //     };
  //     const credentials = { user, accessToken: "next-auth" };
  //     dispatch(setCredentials(credentials));
  //     // router.push("/auth/profile");
  //   }
  // }, [session.data]);
  return (
    <Box>
      <h1>Sign In</h1>
      <input {...register("email", { required: true })} type="text" placeholder="email" />
      <input {...register("password", { required: true })} type="password" placeholder="password" />
      <button onClick={handleSubmit(handleSignin)}>Sign in</button>
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
