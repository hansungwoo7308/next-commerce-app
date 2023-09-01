import { createSlice } from "@reduxjs/toolkit";
type Modal = {
  active?: boolean | null; // 모달 활성화, 비활성화
  type?: string | null; // 액션타입
  message?: string | null; // 모달 메세지
  id?: string | null; // 식별할 아이디
  ids?: string[] | null; // 식별할 아디디 어레이
  action1?: Function | null; // 액션
  action1Label?: string | null;
  action2?: Function | null; // 액션
  action2Label?: string | null;
  disabled?: boolean | null;
  // callback?: Function | null; // 액션
  // onClose?:()=>void;
  // onSubmit?:()=>void;
  // body?:React.ReactElement;
  // footer?:React.ReactElement;
};
// const initialState: Modal[] = [];
const initialState: Modal = {};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      const {
        active,
        type,
        message,
        id,
        ids,
        action1,
        action1Label,
        action2,
        action2Label,
        disabled,
      } = action.payload;
      if (!active) return {};
      if (active) state.active = active;
      if (type) state.type = type;
      if (message) state.message = message;
      if (id) state.id = id;
      if (ids) state.ids = ids;
      if (action1) state.action1 = action1;
      if (action1Label) state.action1Label = action1Label;
      if (action2) state.action2 = action2;
      if (action2Label) state.action2Label = action2Label;
      if (disabled) state.disabled = disabled;
      // state.callback = callback;

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
