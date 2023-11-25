import { setModal } from "lib/client/store/modalSlice";
import { setProductId } from "lib/client/store/productManagerSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function ProductManagerFixed() {
  // exteranl
  const { productId, reviewIds } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    const settings = { active: true, type: "DELETE_PRODUCT_REVIEWS" };
    dispatch(setModal(settings));
  };

  // internal
  const mangerRef: any = useRef(null);
  // useEffect(() => {
  //   if (selectedProductReviewIds.length === 0) mangerRef.current.style.left = "-15rem";
  //   else mangerRef.current.style.left = "2rem";
  // }, [selectedProductReviewIds]);

  return (
    <Box className="product-manager" ref={mangerRef}>
      <h4>Product Manager</h4>
      <hr />
      <button className="delete-button" onClick={handleOpenModal} disabled={reviewIds.length === 0}>
        Delete the selected items
      </button>
    </Box>
  );
}

const Box = styled.div`
  min-width: 12rem;

  border: 1px solid;
  border-radius: 10px;
  padding: 1rem;
  background-color: #555;

  position: fixed;
  bottom: 3rem;
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    text-align: center;
  }
  hr {
    place-self: stretch;
  }

  button {
    &:disabled {
      background-color: #222;
    }
  }
`;
