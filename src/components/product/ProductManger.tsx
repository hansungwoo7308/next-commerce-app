import { setSelectedProductIds } from "lib/client/store/productManagerSlice";
import { setModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function ProductManger({ products }: any) {
  const { selectedProductIds } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSelectAll = () => {
    const productIds = products.map((product: any) => product._id);
    dispatch(setSelectedProductIds(productIds));
  };
  const handleUnselectAll = () => {
    dispatch(setSelectedProductIds([]));
  };
  const handleCreateProduct = () => {
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT" }));
  };
  const handleDeleteProducts = () => {
    dispatch(setModal({ active: true, type: "DELETE_PRODUCTS", ids: selectedProductIds }));
  };

  return (
    <Box className="product-manager">
      <h4>Product Manager</h4>
      <hr />
      <button
        className="clear-button"
        onClick={() => {
          localStorage.removeItem("ratings");
          delete router.query.ratings;
          router.push({ pathname: router.pathname, query: router.query });
        }}
      >
        Clear ratings
        <br />
        (localStorage)
        <br />
        (localState:component)
      </button>
      <hr />
      <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleUnselectAll}>Unselect All</button>
      <hr />
      <button className="create-button" onClick={handleCreateProduct}>
        Create a product
      </button>
      <button
        className="delete-button"
        onClick={handleDeleteProducts}
        disabled={selectedProductIds?.length === 0}
      >
        Delete the products
      </button>
    </Box>
  );
}

const Box = styled.div`
  min-width: 12rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid;
  border-radius: 10px;
  padding: 1rem;
  background-color: #333;
  > h4 {
    text-align: center;
  }
  > hr {
    place-self: stretch;
  }
`;
