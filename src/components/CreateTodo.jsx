import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { Formik, Form, Field } from "formik";

const CreateTodo = ({ todo, setTodo }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const initialValues = {
    title: "",
    description: "",
  };

  const addTodo = async (values, actions) => {
    const token = cookies.token;
    if (values.title !== "" || values.description !== "") {
      const response = await axios.post(
        "http://localhost:3000/todo/new",
        values,
        {
          headers: { token: token },
        }
      );
      const response2 = await axios.get("http://localhost:3000/todo/", {
        headers: {
          token: token,
        },
      });
      setTodo([...response2.data]);
      actions.resetForm();
    }
  };

  return (
    <>
      <div>
        <Formik
          className="flex flex-col gap-3 "
          initialValues={initialValues}
          onSubmit={addTodo}
        >
          {({ isSubmitting }) => (
            <Form className="flex gap-3 flex-col">
              <div className="flex gap-3">
                <Field
                  className="p-3 border-solid border-2 border-slate-700 w-full"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <button
                  type="submit"
                  className="bg-slate-900 text-white p-3 rounded-lg active:bg-slate-700"
                >
                  Add
                </button>
              </div>
              <Field
                type="text"
                className="p-3 border-solid border-2 border-slate-700 w-full h-14"
                placeholder="Description"
                name="description"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateTodo;
