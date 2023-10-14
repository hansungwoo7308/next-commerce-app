import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface Props {
  setSelectedItems?: any;
  selectedItems?: any;
}

export default function Option({ setSelectedItems, selectedItems }: Props) {
  const optionListRef: any = useRef(null);
  // const [selectedItem, setSelectedItem]: any = useState(null);
  const [quantity, setQuantity]: any = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  // option list
  const handleClickOptionItem = (item: string) => {
    optionListRef.current.classList.remove("option-list-open");
    const newItem = { item, quantity };
    // console.log({ newItem });
    setSelectedItems((state: any) => {
      const isDuplicated = state.find((v: any) => v.item === item) ? true : false;
      // console.log({ state, item, isDuplicated });
      if (isDuplicated) return state;
      return [...state, newItem];
    });
    // setSelectedItems((state: any) => [...state, newItem]);
  };
  useEffect(() => {
    const handleClick = () => optionListRef.current.classList.remove("option-list-open");
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // option count button
  const handleDecrease = (e: any) => {
    const currentQuantity = Number(getValues("quantity"));
    // if (currentQuantity === 1) return;
    setValue("quantity", currentQuantity - 1);
    // useForm getValues로는 react dom에서 값 변경에 따른 dom제어가 되지 않기 때문에,
    // react useState를 사용한다.
    // setQuantity(currentQuantity - 1);
  };
  const handleIncrease = (selectedItem: any) => {
    console.log({ selectedItem });
    // const currentQuantity = Number(getValues("quantity"));

    // selectedItem.quantity += 1;
    console.log({ selectedItems });
    setSelectedItems((state: any) => {
      const foundItem = state.find((v: any) => v.item === selectedItem.item);
      if (!foundItem) return;
      foundItem.quantity += 1;
      return state;
    });

    // selectedItems.map((state: any) => {
    //   console.log({ state });
    //   // const foundItem = state.find((v: any) => v.item === selectedItem);
    //   // console.log({ foundItem });
    // });

    // setValue("quantity", currentQuantity + 1);
    // setQuantity(currentQuantity + 1);
    // setSelectedItems((state: any) => {
    //   // console.log({ state });
    // });
  };

  return (
    <Box>
      <div className="option">
        <a
          className="option-guide"
          onClick={(e) => {
            e.stopPropagation();
            optionListRef.current.classList.add("option-list-open");
          }}
        >
          Select the item
        </a>
        <ul className="option-list" ref={optionListRef}>
          <li className="option-item" onClick={() => handleClickOptionItem("1")}>
            <a href="#">1</a>
          </li>
          <li className="option-item" onClick={() => handleClickOptionItem("2")}>
            <a href="#">2</a>
          </li>
          <li className="option-item" onClick={() => handleClickOptionItem("3")}>
            <a href="#">3</a>
          </li>
          <li className="option-item" onClick={() => handleClickOptionItem("4")}>
            <a href="#">4</a>
          </li>
        </ul>
      </div>
      {/* <div className="option">
        <a
          className="option-guide"
          onClick={(e) => {
            e.stopPropagation();
            optionListRef.current.classList.add("option-list-open");
          }}
        >
          Select the item
        </a>
        <ul className="option-list" ref={optionListRef}>
          <li className="option-item" onClick={() => setSelectedItem("1")}>
            <a href="#">1</a>
          </li>
          <li className="option-item" onClick={() => setSelectedItem("2")}>
            <a href="#">2</a>
          </li>
          <li className="option-item" onClick={() => setSelectedItem("3")}>
            <a href="#">3</a>
          </li>
          <li className="option-item" onClick={() => setSelectedItem("4")}>
            <a href="#">4</a>
          </li>
        </ul>
      </div> */}
      {
        // selectedItems?.length &&
        selectedItems?.map((selectedItem: any, index: number) => {
          console.log({ test: selectedItem });
          return (
            <div key={index} className="selected-item-outer">
              <div className="selected-item-option">
                <button onClick={() => handleDecrease(selectedItem)} disabled={quantity === 1}>
                  -
                </button>
                <input
                  // {...register("quantity")}
                  type="number"
                  defaultValue={1}
                  value={selectedItem.quantity}
                  // readOnly
                  // onChange={}
                />
                {/* <h1>{selectedItem?.quantity}</h1> */}
                <button
                  onClick={() =>
                    setSelectedItems((state: any) => {
                      const foundItem = state.find((v: any) => v.item === selectedItem.item);
                      if (!foundItem) return;
                      // foundItem.quantity += 1;
                      // const newState = [...state].map((v: any) => {
                      //   if (v.item === selectedItem.item) {
                      //     v.quantity += 1;
                      //   }
                      // });
                      const newState = [...state];
                      console.log({ newState });
                      newState.find((v: any) => v.item === selectedItem.item).quantity += 1;
                      // console.log({ newState });
                      // return [...state, foundItem];
                      return newState;
                    })
                  }
                >
                  +
                </button>
                {/* <button onClick={() => handleIncrease(selectedItem)}>+</button> */}
              </div>
              <div>item : {selectedItem.item}</div>
            </div>
          );
        })
      }
      {/* {selectedItems.length
        ? selectedItems.map((item: any, index: number) => <div key={index}>asdas</div>)
        : "no"} */}
    </Box>
  );
}

const Box = styled.div`
  .option {
    position: relative;
    background-color: gray;
    .option-guide {
      width: 100%;
      display: block;
      border: 1px solid #ededed;
      padding: 0.5rem;
    }
    .option-list {
      width: 100%;
      transition: all 1s;
      position: absolute;
      top: 100%;
      background-color: #aaa;
      color: #000;
      border: 1px solid #ededed;
      border-top: none;
      display: none;
      .option-item {
        a {
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          display: block;
        }
      }
    }
    .option-list-open {
      display: block;
    }
  }
  .selected-item-outer {
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    .selected-item-option {
      input {
        /* width: 2rem; */
        padding: 0.5rem;
        text-align: center;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        /* margin: 0; */
      }
      button:disabled {
        cursor: not-allowed;
      }
    }
    .selected-item {
      float: right;
    }
  }
`;
