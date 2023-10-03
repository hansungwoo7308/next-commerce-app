import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ModalState {
  active?: boolean | null; // 모달 활성화, 비활성화
  type?: string | null; // 액션타입

  message?: string | null; // 모달 메세지
  id?: string | null; // 식별할 아이디
  ids?: string[] | null; // 식별할 아디디 어레이
  modalAction?: Function | null; // 액션
  modalActionLabel?: string | null;
  modalAction2?: Function | null; // 액션
  modalAction2Label?: string | null;
  disabled?: boolean | null;

  src?: string | null; // image src
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
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state: any, action: PayloadAction<ModalAction>) => {
      // const {
      //   active,
      //   type,
      //   message,
      //   id,
      //   ids,
      //   modalAction,
      //   modalActionLabel,
      //   modalAction2,
      //   modalAction2Label,
      //   disabled,
      // } = action.payload;
      // if (!active) return {};
      // if (active) state.active = active;
      // if (type) state.type = type;
      // if (message) state.message = message;
      // if (id) state.id = id;
      // if (ids) state.ids = ids;
      // if (modalAction) state.modalAction = modalAction;
      // if (modalActionLabel) state.modalActionLabel = modalActionLabel;
      // if (modalAction2) state.modalAction2 = modalAction2;
      // if (modalAction2Label) state.modalAction2Label = modalAction2Label;
      // if (disabled) state.disabled = disabled;
      // state.callback = callback;

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
