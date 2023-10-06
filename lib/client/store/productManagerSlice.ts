import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  ids?: string[] | null;
  selectedProductIds?: any[] | null;
  selectedProductReviewIds?: any[] | null;
}

const initialState: InitialState = {
  ids: [],
  selectedProductIds: [],
  selectedProductReviewIds: [],
};

export const productManagerSlice = createSlice({
  name: "productManager",
  initialState,
  reducers: {
    // ids methods
    setIds: (state, action) => {
      state.ids = action.payload;
    },
    addId: (state, action) => {
      state.ids?.push(action.payload);
    },
    removeId: (state, action) => {
      state.ids = state.ids?.filter((id) => id !== action.payload);
    },

    // product ids methods
    setSelectedProductIds: (state, action) => {
      const productIds = action.payload;
      state.selectedProductIds = productIds;
    },
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

export const {
  // ids actions
  setIds,
  addId,
  removeId,

  // product ids actions
  setSelectedProductIds,
  addProductId,
  deleteProductId,
}: any = productManagerSlice.actions;
