import { setModal } from "lib/client/store/modalSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
export default function ProductCreateForm() {
  // store (external)
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
  // state (internal)
  const [product, setProduct]: any = useState({});
  const [images, setImages]: any = useState([]);
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, getValues, reset, formState, control } =
    useForm();
  const submit = async (data: any) => {
    console.log("data : ", data);
    // check validation
    if (images.length === 0) return toast.error("Please fill the image field.");
    if (data.category === "all") return toast.error("Please fill the category field.");
    // set the formData
    const formData: any = new FormData();
    for (let image of images) formData.append("images", image);
    for (let key in data) formData.append(key, data[key]);
    // create
    try {
      dispatch(setLoading(true));
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v2/products",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      logResponse(response);
      dispatch(setLoading(false));
      toast.success("The creation was completed");
      router.push("/category/all");
    } catch (error: any) {
      console.log({ error });
      toast.error(error.message);
    }
  };
  const handleDeleteButton = (e: any, index: any) => {
    e.preventDefault();
    const filteredImages = images.filter((v: any, i: any) => i !== index);
    setImages(filteredImages);
    // console.log(filteredImages);
    // setValue("images", filteredImages);
  };
  const handleChangeUploadInput = (e: any) => {
    const newImages = e.target.files;
    // check the duplicated items
    for (let newImage of newImages) {
      for (let image of images) {
        if (newImage.name === image.name) return console.log({ images });
      }
    }
    const changedImages: any = [...images, ...newImages];
    setImages(changedImages);
    // const newImages = Array.from(e.target.files);
  };
  const handleCloseButton = (e: any) => {
    e.preventDefault();
    dispatch(setModal({ active: false }));
  };
  useEffect(() => {
    console.log({ images });
  }, [images]);
  return (
    <Box>
      <form>
        <div className="header">
          <h3>Product Create Form</h3>
        </div>
        <hr />
        <br />
        <div className="main">
          <div className="images">
            <div className="preview-images-outer">
              <div className="preview-images">
                {images.map((image: any, index: any) => (
                  <div key={image.id} className={`image ${index === 0 && "thumbnail-image"}`}>
                    <Image
                      src={image.url || image.secure_url || URL.createObjectURL(image)}
                      alt={image.url || image.secure_url || URL.createObjectURL(image)}
                      width={100}
                      height={100}
                    />
                    <button onClick={(e: any) => handleDeleteButton(e, index)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            <label className="image-uploader">
              <input type="file" multiple accept="image/*" onChange={handleChangeUploadInput} />
            </label>
          </div>
          <label className="category">
            {/* <span>Category</span> */}
            <select {...register("category", { required: true })} id="category">
              <option>Select the category</option>
              <option value="electronics">Electronics</option>
              <option value="animal">Animal</option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
            </select>
          </label>
          <label className="name">
            <input {...register("name", { required: true })} type="text" placeholder="Name" />
          </label>
          <label className="description">
            <textarea
              {...register("description", { required: true })}
              cols={30}
              rows={4}
              placeholder="Description"
            />
          </label>
          <label className="seller">
            <input {...register("seller", { required: true })} type="text" placeholder="Seller" />
          </label>
          <label className="price">
            <input {...register("price", { required: true })} type="number" placeholder="Price" />
          </label>
          <label className="stock">
            <input {...register("stock", { required: true })} type="number" placeholder="Stock" />
          </label>
        </div>
        <div className="footer">
          <button
            onClick={handleSubmit(submit)}
            // disabled={loading}
          >
            Create
          </button>
          <button onClick={handleCloseButton}>Close</button>
        </div>
      </form>
    </Box>
  );
}
const Box = styled.div`
  form {
    width: 400px;
    .main {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .images {
        width: 100%;
        border: 2px solid #777;
      }
      .preview-images-outer {
        overflow-x: scroll;
        .preview-images {
          width: fit-content;
          display: flex;
          gap: 1rem;
          padding: 1rem;
          .thumbnail-image {
            border: 5px solid coral;
          }
          .image {
            position: relative;
            width: 10rem;
            height: 10rem;
            border: 2px solid #777;
            button {
              width: 2rem;
              height: 2rem;
              position: absolute;
              top: 0.3rem;
              right: 0.3rem;
              background-color: #fff;
              color: #000;
              border: 2px solid #777;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
      .image-uploader {
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      gap: 1rem;
      margin-top: 1rem;
    }
    input,
    select,
    textarea {
      padding: 0.5rem;
    }
    button {
      cursor: pointer;
      background-color: #333;
      color: #eee;
      &:hover {
        background-color: green;
        color: #fff;
      }
    }
  }
`;
