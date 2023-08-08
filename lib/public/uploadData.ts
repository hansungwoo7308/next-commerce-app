import axios from "axios";
export const uploadData = async (images: any) => {
  console.log("\x1b[33m\n[lib/public/utils/uploadData]");
  // upload image to cloudinary
  // console.log("images : ", images);
  let array = [];
  for (const item of images) {
    const formData: any = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", process.env.CLOUD_NAME);
    // const response = await fetch(process.env.CLOUD_API, {
    //     method: "POST",
    //     body: formData
    // })
    // const data = await response.json()
    // array.push({public_id: data.public_id, url: data.secure_url})
    try {
      const response = await axios({
        method: "POST",
        url: process.env.CLOUD_API_BASE_URL,
        data: formData,
      });
      const uploadedImage = response.data;
      console.log("uploadedImage : ", uploadedImage);
      const { public_id, secure_url } = response.data;
      array.push({ public_id, secure_url });
    } catch (error) {
      console.log("uploadData error : ", error);
    }
  }
  return array;
};
