import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  id?: string | null;
  ids?: string[] | null;
  reviewId?: string | null;
  reviewIds?: string[] | null;
}

const initialState: InitialState = {
  id: null,
  ids: [],
  reviewId: null,
  reviewIds: [],
};

export const productManagerSlice = createSlice({
  name: "productManager",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setIds: (state, action) => {
      state.ids = action.payload;
    },
    setReviewId: (state, action) => {
      state.reviewId = action.payload;
    },
    setReviewIds: (state, action) => {
      state.reviewIds = action.payload;
    },
  },
});

export const { setId, setIds, setReviewId, setReviewIds }: any = productManagerSlice.actions;
