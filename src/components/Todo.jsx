import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import CreateTodo from "./CreateTodo";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Todo = () => {
  const navigate = useNavigate();
  const { mode } = useGlobalContext();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [todo, setTodo] = useState([]);

  const [editing, setEditing] = useState(false);

  const deleteTodo = async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/todo/delete/${id}`,
      { headers: { token: cookies.token } }
    );
    const filteredTodo = todo.filter((t) => t._id != id);
    setTodo([...filteredTodo]);
  };

  const toggleTodo = (id) => {
    setEditing(!editing);
    setTodo((prevTodos) =>
      prevTodos.map((t) => (t._id === id ? { ...t, editMode: !t.editMode } : t))
    );
  };

  const saveTodo = async (values) => {
    const token = cookies.token;
    const response = await axios.put(
      `http://localhost:3000/todo/edit/${values.id}`,
      values,
      {
        headers: { token: token },
      }
    );
    setTodo((prevTodos) =>
      prevTodos.map((t) =>
        t._id === values.id
          ? {
              ...t,
              title: values.title.trim(),
              description: values.description.trim(),
            }
          : t
      )
    );
    toggleTodo(values.id);
  };

  const getTodos = async () => {
    const response = await axios.get("http://localhost:3000/todo/", {
      headers: {
        token: cookies.token,
      },
    });
    setTodo([...response.data]);
  };

  useEffect(() => {
    if (mode === "logged-out") {
      return navigate("/login");
    }
    getTodos();
  }, []);

  return (
    <>
      <div className="mt-20 m-5 flex justify-center items-center text-2xl flex-col gap-10">
        <CreateTodo todo={todo} setTodo={setTodo} />
        <div className="flex flex-col-reverse gap-7">
          {todo.map((to) => {
            return (
              <div
                key={to._id}
                className="bg-slate-500 p-5 rounded-lg text-white shadow-xl hover:shadow-2xl duration-150 cursor-pointer flex flex-col gap-2"
              >
                {to.editMode ? (
                  <>
                    <Formik
                      initialValues={{
                        id: to._id,
                        title: to.title,
                        description: to.description,
                      }}
                      onSubmit={saveTodo}
                    >
                      {({ isSubmitting }) => (
                        <>
                          <Form className="flex flex-col gap-2">
                            <Field
                              type="text"
                              className="bg-slate-400 font-bold w-full p-1 rounded-lg"
                              name="title"
                            />
                            <Field
                              type="text"
                              className="bg-slate-400 text-lg w-full p-1 rounded-lg"
                              name="description"
                            />
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-slate-600 px-5 py-2 text-sm rounded-2xl font-bold hover:bg-green-600 active:bg-green-700 duration-100"
                            >
                              Save
                            </button>
                          </Form>
                        </>
                      )}
                    </Formik>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold break-all">{to.title}</h1>
                    <p className="text-lg break-all">{to.description}</p>
                    <div className="flex justify-around gap-2">
                      <button
                        onClick={() => {
                          toggleTodo(to._id);
                        }}
                        className="bg-slate-400 px-5 py-2 text-sm rounded-2xl font-bold hover:bg-green-600 active:bg-green-700 duration-100"
                        disabled={editing ? true : false}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteTodo(to._id);
                        }}
                        className="bg-slate-800 px-5 py-2 text-sm rounded-2xl font-bold hover:bg-red-600 active:bg-red-700 duration-100"
                        disabled={editing ? true : false}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
