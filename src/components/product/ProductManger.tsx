import { addProductId, setSelectedProductIds } from "lib/client/store/productManagerSlice";
import { setModal } from "lib/client/store/modalSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function ProductManger({ products }: any) {
  const dispatch = useDispatch();
  const handleCreateProduct = () => {
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT" }));
  };
  const handleSelectAll = () => {
    const productIds = products.map((product: any) => product._id);
    dispatch(setSelectedProductIds(productIds));
  };
  const handleUnselectAll = () => {
    dispatch(setSelectedProductIds([]));
  };

  return (
    <Box>
      <button onClick={handleCreateProduct}>Create a product</button>
      <hr />
      <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleUnselectAll}>Unselect All</button>
      <button>Delete the selected products</button>
    </Box>
  );
}

const Box = styled.div`
  width: 12rem;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid;
  border-radius: 10px;
  padding: 1rem;
  background-color: #333;
`;
