import React, { useReducer, useState } from "react";

const person = {
  name: 'mark',
  age: 23
}


function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_NAME":
      return {...state, name:action.payload}
    case "CHANGE_AGE":
      return { ...state, age: action.payload }
  }
}

const UseReducerPractice = () => {
  const [state, dispatch] = useReducer(reducer, person);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const addName = () => {
    dispatch({ type: "CHANGE_NAME", payload: newName });
    setNewName("");
  };

  const addAge = () => {
    dispatch({ type: "CHANGE_AGE", payload: newAge });
    setNewAge("");
  };

  return (
    <div>
      <p>{state.name}</p>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={addName}>ADD NAME</button>

      <p>{state.age}</p>
      <input
        type="text"
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={addAge}>ADD AGE</button>
    </div>
  );
};

export default UseReducerPractice;
