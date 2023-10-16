import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface Props {
  setSelectedItems?: any;
  selectedItems?: any;
  options?: any;
}

export default function Option({ setSelectedItems, selectedItems, options }: Props) {
  const optionListRef: any = useRef(null);

  // option list
  const handleOpenOption = (e: any) => {
    e.stopPropagation();
    optionListRef.current.classList.add("option-list-open");
  };
  const handleClickOption = (option: any) => {
    optionListRef.current.classList.remove("option-list-open");
    const newItem = { item: option.item, price: option.price, quantity: 1 };
    // console.log({ newItem });
    setSelectedItems((state: any) => {
      const isDuplicated = state.find((v: any) => v.item === option.item) ? true : false;
      if (isDuplicated) return state;
      const newState = [...state, newItem];
      return newState;
    });
  };
  useEffect(() => {
    const handleClick = () => optionListRef.current.classList.remove("option-list-open");
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // option count button
  // const handleDecrease = (e: any) => {
  //   const currentQuantity = Number(getValues("quantity"));
  //   // if (currentQuantity === 1) return;
  //   setValue("quantity", currentQuantity - 1);
  //   // useForm getValues로는 react dom에서 값 변경에 따른 dom제어가 되지 않기 때문에,
  //   // react useState를 사용한다.
  //   // setQuantity(currentQuantity - 1);
  // };
  // const handleIncrease = (selectedItem: any) => {
  //   console.log({ selectedItem });
  //   // const currentQuantity = Number(getValues("quantity"));

  //   // selectedItem.quantity += 1;
  //   console.log({ selectedItems });
  //   setSelectedItems((state: any) => {
  //     const foundItem = state.find((v: any) => v.item === selectedItem.item);
  //     if (!foundItem) return;
  //     foundItem.quantity += 1;
  //     return state;
  //   });

  //   // selectedItems.map((state: any) => {
  //   //   console.log({ state });
  //   //   // const foundItem = state.find((v: any) => v.item === selectedItem);
  //   //   // console.log({ foundItem });
  //   // });

  //   // setValue("quantity", currentQuantity + 1);
  //   // setQuantity(currentQuantity + 1);
  //   // setSelectedItems((state: any) => {
  //   //   // console.log({ state });
  //   // });
  // };

  return (
    <Box>
      <div className="option">
        <a className="option-guide" onClick={handleOpenOption}>
          Select the item
        </a>
        <ul className="option-list" ref={optionListRef}>
          {options.map((option: any) => (
            <li key={option.item} className="option-item" onClick={() => handleClickOption(option)}>
              <a href="#">{option.item}</a>
            </li>
          ))}
        </ul>
      </div>
      {selectedItems?.map((selectedItem: any, index: number) => {
        return (
          <div key={index} className="selected-item-outer">
            <div>item : {selectedItem.item}</div>
            <div className="selected-item-option">
              <button
                onClick={() =>
                  setSelectedItems((state: any) => {
                    const newState = [...state];
                    newState.find((v: any) => v.item === selectedItem.item).quantity -= 1;
                    return newState;
                  })
                }
                disabled={selectedItem.quantity === 1}
              >
                -
              </button>
              <input
                type="number"
                // defaultValue={1}
                value={selectedItem.quantity}
                onChange={(e) =>
                  setSelectedItems((state: any) => {
                    const newState = [...state];
                    newState.find((v: any) => v.item === selectedItem.item).quantity =
                      e.target.value;
                    return newState;
                  })
                }
              />
              <button
                onClick={() =>
                  setSelectedItems((state: any) => {
                    const newState = [...state];
                    newState.find((v: any) => v.item === selectedItem.item).quantity += 1;
                    return newState;
                  })
                }
              >
                +
              </button>
              {/* <button onClick={() => handleIncrease(selectedItem)}>+</button> */}
            </div>
          </div>
        );
      })}
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
    border: 1px solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5rem;
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
