import { createSlice } from "@reduxjs/toolkit";
interface ProductManagerState {
  selectedProductIds?: any[];
}
interface Props {
  selectedProductIds?: any[];
}
const initialState: any = { selectedProductIds: [] };
export const productManagerSlice = createSlice({
  name: "productManager",
  initialState,
  reducers: {
    setSelectedProductIds: (state, action) => {
      const productIds = action.payload;
      state.selectedProductIds = productIds;
    },
    addProductId: (state, action) => {
      // state.selectedProductIds?.push(action.payload);
      // if (state.selectedProductIds)
      const productId = action.payload;
      state.selectedProductIds = [...state.selectedProductIds, productId];
    },
    deleteProductId: (state, action) => {
      const productId = action.payload;
      const newState = state.selectedProductIds?.filter(
        (selectedProductId: any) => selectedProductId !== productId
      );
      state.selectedProductIds = newState;
    },
  },
});
export const { addProductId, setSelectedProductIds, deleteProductId }: any =
  productManagerSlice.actions;
