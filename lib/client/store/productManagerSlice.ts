import { createSlice } from "@reduxjs/toolkit";
interface ProductManagerState {
  selectedProductIds?: any[] | null;
  selectedProductReviewIds?: any[] | null;
  ids?: string[] | null;
}
const initialState: ProductManagerState = {};
export const productManagerSlice = createSlice({
  name: "productManager",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.ids?.push(action.payload.id);
    },
    removeId: (state, action) => {
      state.ids = state.ids?.filter((id) => id !== action.payload.id);
    },
    // setSelectedIds: (state, action) => {
    //   const ids = action.payload;
    //   state.selectedProductIds = ids;
    // },
    // setSelectedProductIds: (state, action) => {
    //   const productIds = action.payload;
    //   state.selectedProductIds = productIds;
    // },
    addProductId: (state, action) => {
      const productId = action.payload;
      state.selectedProductIds?.push(productId);
      // state.selectedProductIds = [...state.selectedProductIds, productId];
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
export const { addId, removeId, addProductId, deleteProductId }: any = productManagerSlice.actions;
