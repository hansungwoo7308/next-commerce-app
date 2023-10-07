import { setModal } from "lib/client/store/modalSlice";
import { setSelectedProductId } from "lib/client/store/productManagerSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// interface Props {
//   product?: any;
// }

export default function ProductMangerFixed() {
  // state (external)
  const { selectedProductId, selectedProductReviewIds } = useSelector(
    (store: any) => store.productManager
  );

  // state > document object model
  const mangerRef: any = useRef(null);
  useEffect(() => {
    if (selectedProductReviewIds.length === 0) mangerRef.current.style.left = "-15rem";
    else mangerRef.current.style.left = "2rem";
  }, [selectedProductReviewIds]);

  // client action
  const dispatch = useDispatch();
  const handleDeleteItems = () => {
    dispatch(
      setModal({
        active: true,
        type: "DELETE_ITEMS",
        selectedProductId,
        selectedProductReviewIds,
      })
    );
  };

  return (
    <Box className="product-manager" ref={mangerRef}>
      <h4>Product Manager</h4>
      <hr />
      <button
        className="delete-button"
        onClick={handleDeleteItems}
        disabled={selectedProductReviewIds?.length === 0}
      >
        Delete the selected items
      </button>
    </Box>
  );
}

const Box = styled.div`
  min-width: 12rem;
  border: 1px solid red;
  border-radius: 10px;
  padding: 1rem;
  background-color: #333;
  position: fixed;
  bottom: 3rem;
  transition: all 0.3s;

  /* children */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h4 {
    text-align: center;
  }
  > hr {
    place-self: stretch;
  }
`;
