import React, { useReducer, useState } from "react";

function reduce(state, action) {
  switch (action.type) {
    case "INC": {
      return { ...state, count: state.count + 1 };
    }
    case "ADDNAME": {
      return { ...state, name: action.name };
    }
    default:
      return state;
  }
}

const useReducerPractice = () => {
  const [useName, setUseName] = useState("noName");
  const [state, dispatch] = useReducer(reduce, { count: 0, name: "" });

  function decrement() {
    dispatch({ type: "INC" });
  }

  function addName() {
    dispatch({ type: "ADDNAME", name: useName });
  }

  const onMark = () => {
    setUseName("mark");
    addName();
  };

  const onAndras = () => {
    setUseName("andras");
    addName();
  };

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={decrement}>+</button>

      <p>name:{state.name} </p>
      <button onClick={addName}>Add Name</button>

      <button onClick={onMark}>Mark</button>
      <button onClick={onAndras}>Andras</button>
    </div>
  );
};

export default useReducerPractice;
