import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  // general item
  id?: string | null;
  ids?: string[] | null;

  // product
  selectedProductId?: string | null;
  selectedProductIds?: any[] | null;

  // product review
  selectedProductReviewId?: string | null;
  selectedProductReviewIds?: any[] | null;
}

const initialState: InitialState = {
  ids: [],
  selectedProductId: null,
  selectedProductIds: [],
  selectedProductReviewIds: [],
};

export const productManagerSlice = createSlice({
  name: "productManager",
  initialState,
  reducers: {
    // related to general item
    setIds: (state, action) => {
      state.ids = action.payload;
    },
    addId: (state, action) => {
      state.ids?.push(action.payload);
    },
    removeId: (state, action) => {
      state.ids = state.ids?.filter((id) => id !== action.payload);
    },

    // related to product
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    setSelectedProductIds: (state, action) => {
      state.selectedProductIds = action.payload;
    },
    addProductId: (state, action) => {
      const productId = action.payload;
      state.selectedProductIds?.push(productId);
      // state.selectedProductIds = [...state.selectedProductIds, productId];
    },
    removeProductId: (state, action) => {
      const productId = action.payload;
      const newState = state.selectedProductIds?.filter(
        (selectedProductId: any) => selectedProductId !== productId
      );
      state.selectedProductIds = newState;
    },

    // related to product review
    setSelectedProductReviewId: (state, action) => (state.selectedProductReviewId = action.payload),
    setSelectedProductReviewIds: (state, action) =>
      (state.selectedProductReviewIds = action.payload),
    addProductReviewId: (state, action) => {
      state.selectedProductReviewIds?.push(action.payload);
      // state.selectedProductReviewIds = [...state.selectedProductReviewIds, productId];
    },
    removeProductReviewId: (state, action) => {
      state.selectedProductReviewIds = state.selectedProductReviewIds?.filter(
        (selectedProductId: any) => selectedProductId !== action.payload
      );
    },
  },
});

export const {
  // general
  setIds,
  addId,
  removeId,

  // product
  setSelectedProductId,
  setSelectedProductIds,
  addProductId,
  removeProductId,

  // product review
  setSelectedProductReviewId,
  setSelectedProductReviewIds,
  addProductReviewId,
  removeProductReviewId,
}: any = productManagerSlice.actions;
