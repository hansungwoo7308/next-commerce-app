import { createSlice } from "@reduxjs/toolkit";
type Modal = {
  active?: boolean; // 모달 활성화, 비활성화
  type?: string; // 액션타입
  message?: string; // 모달 메세지
  id?: string; // 식별할 아이디
  ids?: string[]; // 식별할 아디디 어레이
  callback?: Function | null; // 액션
  action?: Function | null; // 액션
  // onClose?:()=>void;
  // onSubmit?:()=>void;
  // title?:string;
  // body?:React.ReactElement;
  // footer?:React.ReactElement;
  // disabled?: boolean;
  actionLabel?: string;
  actionSecondary?: Function | null; // 액션
  actionLabelSecondary?: string;
};
// const initialState: Modal[] = [];
const initialState: Modal = {};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      const { active, type, message, id, ids, action: userAction } = action.payload;
      // console.log({ userAction });
      if (active) {
        state.active = true;
        state.type = type;
        state.message = message;
        state.id = id;
        state.ids = ids;
        state.action = userAction;
      } else {
        state.active = false;
        state.type = "";
        state.message = "";
        state.id = "";
        state.ids = [];
        state.action = null;
      }
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
