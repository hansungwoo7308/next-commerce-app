import { setModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function ProductMangerFixed({ products }: any) {
  const { ids } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();

  const handleDeleteItems = () => {
    dispatch(setModal({ active: true, type: "DELETE_ITEMS", ids }));
  };

  if (ids.length === 0) return null;
  return (
    <Box className="product-manager">
      <h4>Product Manager</h4>
      <hr />
      <button
        className="delete-button"
        onClick={handleDeleteItems}
        // disabled={selectedProductIds?.length === 0}
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
  top: 50%;
  left: 1rem;
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
