import { createSlice } from "@reduxjs/toolkit";
type Modal = {
  active?: boolean | null; // 모달 활성화, 비활성화
  type?: string | null; // 액션타입
  message?: string | null; // 모달 메세지
  id?: string | null; // 식별할 아이디
  ids?: string[] | null; // 식별할 아디디 어레이
  callback?: Function | null; // 액션
  action?: Function | null; // 액션
  // onClose?:()=>void;
  // onSubmit?:()=>void;
  // body?:React.ReactElement;
  // footer?:React.ReactElement;
  disabled?: boolean | null;
  actionLabel?: string | null;
  actionSecondary?: Function | null; // 액션
  actionLabelSecondary?: string | null;
};
// const initialState: Modal[] = [];
const initialState: Modal = {};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      const { payload } = action;
      if (!payload.active) return {};
      state.active = true;
      state.type = payload.type;
      state.message = payload.message;
      state.id = payload.id;
      state.ids = payload.ids;
      state.callback = payload.callback;
      state.action = payload.action;
      state.disabled = payload.disabled;
      state.actionLabel = payload.actionLabel;
      state.actionSecondary = payload.actionSecondary;
      state.actionLabelSecondary = payload.actionLabelSecondary;

      // console.log({ userAction });
      // if (active) return action.payload;
      // else return {};
      // return active ? action.payload : {};
    },
    // closeModal: (state) => {
    //   //   const modal: any = state.find((v: any) => v.name === action.payload.name);
    //   //   modal.active = false;
    //   //   return [];
    //   state.active = false;
    //   state.type = "";
    //   state.message = "";
    //   state.id = "";
    //   state.ids = [];
    //   state.callback = null;
    // },
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
