import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { postData } from "lib/public/fetchData";
import { styled } from "styled-components";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import logError from "lib/client/log/logError";
import { SiNaver } from "react-icons/si";

export default function SigninForm() {
  // external
  const dispatch = useDispatch();

  // internal
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();

  const handleSignin = async (data: any) => {
    try {
      dispatch(setLoading(true));
      const response = await postData("v2/auth/signin", data);
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      dispatch(setLoading(false));
      toast.success("Signed in");
      router.push("/my/account");
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };
  const handleSigninWithCredentials = async (data: any) => {
    // console.log("data: ", data);
    try {
      setLoading(true);
      const { email, password } = data;
      const { callbackUrl }: any = router.query;
      console.log({ callbackUrl });
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: callbackUrl || "/",
      });
      console.log({ response });
      setLoading(false);
      toast.success("Signed in by next-auth library");
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
      toast.error(error.message);
    }
  };
  const handleSigninWithNaver = async (e: any) => {
    e.preventDefault();
    await signIn("naver", { redirect: true, callbackUrl: "/" });
  };

  useEffect(() => setFocus("email"), [setFocus]);

  return (
    <Box className="signin-form">
      <h1>Sign In</h1>
      <input {...register("email", { required: true })} type="text" placeholder="email" />
      <input {...register("password", { required: true })} type="password" placeholder="password" />
      <button className="signin" onClick={handleSubmit(handleSignin)}>
        Sign in without Library
      </button>
      <button
        className="signin-with-credentials"
        onClick={handleSubmit(handleSigninWithCredentials)}
      >
        Sign in with Credentials
      </button>
      <button className="signin-with-naver" onClick={handleSigninWithNaver}>
        <SiNaver size={14} />
        Sign in with Naver
      </button>
    </Box>
  );
}

const Box = styled.form`
  width: 50%;
  max-width: 500px;
  min-width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: 2px solid green;
  border-radius: 10px;
  padding: 3rem 1rem;
  background-color: #222;

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

  button {
    width: 200px;
    border-radius: 5px;
    padding: 0.7rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    background-color: inherit;
    color: #fff;
    &:hover {
      background-color: #000;
    }
  }

  .signin {
    background-color: gray;
  }

  .signin-with-credentials {
    background-color: #007aff;
  }

  .signin-with-naver {
    background-color: #03c75a;
  }
`;
