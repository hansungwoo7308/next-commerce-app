import { styled } from "styled-components";
import AccountForm from "@/components/form/AccountForm";

export default function Page() {
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

  return (
    <Main className="my-account-page">
      <section>
        <AccountForm />
      </section>
    </Main>
  );
}

const Main = styled.main`
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 500px) {
    .account-form {
      grid-template-areas: "area1 area1" "area2 area2";
    }
  }
`;
