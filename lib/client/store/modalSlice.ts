import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  active?: boolean | null; // 모달 활성화, 비활성화
  type?: string | null; // 액션타입

  id?: string | null; // 식별할 아이디
  ids?: string[] | null; // 식별할 아디디 어레이
  message?: string | null; // 모달 메세지
  modalAction?: Function | null; // 액션
  modalActionLabel?: string | null;
  modalAction2?: Function | null; // 액션
  modalAction2Label?: string | null;
  disabled?: boolean | null;

  selectedProductId?: string | null;
  selectedProductIds?: any[] | null;
  selectedProductReviewIds?: any[] | null;

  src?: string | null; // image src

  review?: any;

  // callback?: Function | null; // 액션
  // onClose?:()=>void;
  // onSubmit?:()=>void;
  // body?:React.ReactElement;
  // footer?:React.ReactElement;
}

interface ModalAction extends ModalState {
  // required properties
  active: boolean | null; // 모달 활성화, 비활성화
}

const initialState: ModalState = {
  // active: true,
  // type: "CREATE_PRODUCT",
  type: "CREATE_PRODUCT_REVIEW",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state: any, action: PayloadAction<ModalAction>) => {
      if (action.payload.active === false) return {};
      for (let [key, value] of Object.entries(action.payload)) {
        // console.log({ key, value });
        state[key] = value;
      }

      // console.log({ userAction });
      // if (active) return action.payload;
      // else return {};
      // return active ? action.payload : {};
    },
  },
  extraReducers(builder) {
    // builder.addCase(fetchTest.fulfilled, (state, action) => {
    //   // 리턴된 값으로 상태 변경
    //   console.log("extraReducers : ", action.payload);
    //   return action.payload;
    // });
  },
});

export const { setModal } = modalSlice.actions;
