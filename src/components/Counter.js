import { useReducer } from "react";
import reducer from "../reducers/reducer";

function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  });
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      &nbsp;
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      &nbsp;
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

export default Counter;
