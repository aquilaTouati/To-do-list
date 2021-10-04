import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Form = () => {
  const params = useParams();
  const { id } = params.id;
  const [users, setUsers] = useState(true);
  const [loading, setLoading] = useState(true);
   const [update, setUpdate] = useState();
  useEffect(() => {
    const modification = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users" + id);
        console.log(response.data);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading2(false);

        setError(false);
      }
    };
    modification();
  }, []);
  return (
    <div>
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
                <button
                  onClick={async (e) => {
                    await axios.put(
                      "http://localhost:5000/users/" + value._id
                    );
                    const editUser = users.update(
                     response.data.data
                    );
                    setUpdate(editUser);
                  }}
                  
                >
                  Modifier
                </button>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Form;
