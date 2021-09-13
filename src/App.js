import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { add, supprimer, done } from "./Action/Action";
import { nanoid } from "nanoid";
import { useState } from "react";

function App() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState();
  return (
    <div>
      <input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />

      <button
        onClick={() => {
          dispatch(add({ id: nanoid(), task: inputValue, done: false }));
        }}
      >
        {" "}
        ADD
      </button>

      <p> TO DO: </p>

      <ul>
        {list.map((value) => (
          <div>
            <li className={`${value.done ? "done" : ""}`} key={value.id}>
              {value.task}
            </li>
            <button
              onClick={() => {
                dispatch(supprimer(value.id));
              }}
            >
              SUPPRIMER
            </button>
            <button
              onClick={() => {
                dispatch(done(value.id));
              }}
            >
              Done
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
