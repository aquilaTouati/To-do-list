import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, done } from "./Action/Action";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import Joi from "joi";
import * as Yup from "yup";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Formulaire from "./Formulaire";

function Home() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  // const [inputValue, setInputValue] = useState();
  // const [inputValue1, setInputValue1] = useState();
  // const [inputValue2, setInputValue2] = useState();
  // const [inputValue3, setInputValue3] = useState();
  const [loading2, setLoading2] = useState();

  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        console.log(response.data);
        setUsers(response.data.data);
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
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Formulaire">
            <Formulaire/>
          </Route>
        </Switch>
      </Router>
      <Formik
        initialValues={{ name: "", userName: "", email: "", phone: "" }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(50).required(),
          userName: Yup.string().required(),
          email: Yup.string().email().required(),
          phone: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.post("http://localhost:5000/users", {
            email: values.email,
            name: values.name,
            userName: values.userName,
            phone: values.phone,
          });

          console.log("values=", values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <div>
              <form onSubmit={handleSubmit}>
                {errors.email && touched.email && <div> {errors.email} </div>}
                {errors.name && touched.name && <div> {errors.name} </div>}
                {errors.userName && touched.userName && (
                  <div> {errors.userName} </div>
                )}
                {errors.phone && touched.phone && <div> {errors.phone} </div>}
                <label>Email : </label>
                <input
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <label> Name : </label>
                <input
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <label> Username : </label>
                <input
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
                <label> Phone : </label>
                <input
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <button type="submit"> Submit </button>
              </form>
            </div>
          );
        }}
      </Formik>
      {loading ? (
        <div>loading </div>
      ) : error ? (
        <div>error </div>
      ) : (
        <div>
          {/* <form>
            <input onChange={(e) => setInputValue(e.target.value)} />
            <input onChange={(e) => setInputValue1(e.target.value)} />
            <input onChange={(e) => setInputValue2(e.target.value)} />

            <input onChange={(e) => setInputValue3(e.target.value)} />
            <button
              disabled={loading2}
              onClick={async (e) => {
                e.preventDefault();
                setLoading2(true);
                try {
                  const response = await axios.post(
                    "http://localhost:5000/users",
                    {
                      userName: inputValue,
                      email: inputValue1,
                      phone : inputValue2,
                      name: inputValue3

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
          </form> */}
          <ul>
            {users.map((value) => (
              <div>
                <li
                  className={`${value.userName ? "username" : ""}`}
                  key={value.id}
                >
                  {value.userName}
                </li>
                <button
                  onClick={async (e) => {
                    await axios.delete(
                      "http://localhost:5000/users/" + value._id
                    );
                    const newUsers = users.filter(
                      (user) => user._id != value._id
                    );
                    setUsers(newUsers);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    history.push(`/Formulaire`);
                  }}
                >
                  {" "}
                  Modifier{" "}
                </button>
              </div>
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

export default Home;
