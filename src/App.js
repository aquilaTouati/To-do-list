import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, done } from "./Action/Action";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [loading2, setLoading2] = useState();
  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading2(false);

        setError(false);
      }
    };
    getUsername();
  }, []);
  return (
    <div>
      {loading ? (
        <div>loading </div>
      ) : error ? (
        <div>error </div>
      ) : (
        <div>
          <form>
            <input onChange={(e) => setInputValue(e.target.value)} />
            <button
              disabled={loading2}
              onClick={async (e) => {
                e.preventDefault();
                setLoading2(true);
                try {
                  const response = await axios.post(
                    "https://jsonplaceholder.typicode.com/users",
                    {
                      username: inputValue,
                    }
                  );
                  setLoading2(false);
                  toast.success("created");
                } catch (error) {
                  setLoading2(false);
                  toast.error("error");
                  setError(false);
                }
              }}
            >
              Submit
            </button>
          </form>
          <ul>
            {users.map((value) => (
              <li
                className={`${value.username ? "username" : ""}`}
                key={value.id}
              >
                {value.username}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

//   const list = useSelector((state) => state.list);
//   const dispatch = useDispatch();
//   const [inputValue, setInputValue] = useState();
//   return (
//     <div>
//       <input
//         onChange={(e) => {
//           setInputValue(e.target.value);
//         }}
//       />
//       <button
//         onClick={() => {
//           dispatch(add({ id: nanoid(), task: inputValue, done: false }));
//         }}
//       >
//         {" "}
//         ADD
//       </button>
//       <p> TO DO: </p>
//       <ul>
//         {list.map((value) => (
//           <div>
//             <li className={`${value.done ? "done" : ""}`} key={value.id}>
//               {value.task}
//             </li>
//             <button
//               onClick={() => {
//                 dispatch(remove(value.id));
//               }}
//             >
//               Remove
//             </button>
//             <button
//               onClick={() => {
//                 dispatch(done(value.id));
//               }}
//             >
//               Done
//             </button>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
