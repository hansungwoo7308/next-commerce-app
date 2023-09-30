import { setModal } from "lib/client/store/modalSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function ProductManger() {
  const dispatch = useDispatch();
  const handleCreateProduct = () => {
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT" }));
  };

  return (
    <Box>
      <button onClick={handleCreateProduct}>Create a product</button>
      <p>Select all and Unselect all, and then delete items</p>
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
