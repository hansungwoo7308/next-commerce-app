import axios from "axios";
export const uploadImages = async (images: any) => {
  console.log("\x1b[33m\n[lib/public/utils/uploadImages]");
  // upload image to cloudinary
  // console.log("images : ", images);
  let uploadedImages = [];
  for (const item of images) {
    const formData: any = new FormData();
    formData.append("cloud_name", process.env.CLOUDINARY_NAME);
    formData.append("upload_preset", process.env.CLOUDINARY_PRESET);
    formData.append("file", item);
    try {
      // upload
      const response = await axios({
        method: "POST",
        url: process.env.CLOUDINARY_API_BASE_URL,
        data: formData,
      });
      // out
      const { public_id, secure_url } = response.data;
      console.log({ public_id, secure_url });
      uploadedImages.push({ public_id, secure_url });
    } catch (error) {
      console.log("uploadImages error : ", error);
    }
  }
  return uploadedImages;
};
