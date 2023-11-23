import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setLoading } from "lib/client/store/loadingSlice";
import { postData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function SignupForm() {
  // external
  const dispatch = useDispatch();
  const router = useRouter();

  // internal
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
    console.log({ data });
    // return;

    try {
      dispatch(setLoading(true));
      const response: any = await postData("v2/auth/signup", data);
      logResponse(response);
      dispatch(setLoading(false));
      toast.success("signup success");
      // reset();
      setFocus("name");
      router.push("/auth/signin");
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error("signup failed");
    }
  };

  useEffect(() => setFocus("name"), [setFocus]);

  return (
    <Box className="signup-form">
      <h1>Sign Up</h1>
      <div className="name">
        <input
          {...register("name", {
            required: {
              value: true,
              message: "This field is required.",
            },
            maxLength: {
              value: 20,
              message: "Password should not be longer than 20 characters.",
            },
          })}
          className="input"
          type="text"
          placeholder="Name"
        />
        <small>{errors.name?.message as string}</small>
      </div>
      <div className="email">
        <input
          {...register("email", {
            required: {
              value: true,
              message: "This field is required.",
            },
          })}
          className="input"
          type="email"
          placeholder="Email"
          autoComplete="off"
        />
        <small>{errors.email?.message as string}</small>
      </div>
      <div className="password">
        <input
          {...register("password", {
            required: {
              value: true,
              message: "This field is required.",
            },
            minLength: {
              value: 4,
              message: "Password should have a length of at least 4 characters.",
            },
            maxLength: {
              value: 20,
              message: "Password should not be longer than 20 characters.",
            },
          })}
          className="input"
          type="password"
          placeholder="Password"
        />
        <small>{errors.password?.message as string}</small>
      </div>
      <div className="passwordConfirm">
        <input
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "This field is required.",
            },
            validate: (passwordConfirm) => {
              return passwordConfirm === password.current;
            },
          })}
          className="input"
          type="password"
          placeholder="Password Confirm"
        />
        <small>{errors.passwordConfirm?.message as string}</small>
      </div>
      <button onClick={handleSubmit(handleSignup)}>Sign Up</button>
    </Box>
  );
}

const Box = styled.div`
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
`;