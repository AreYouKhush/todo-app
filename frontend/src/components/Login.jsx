import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import CustomInput from "./CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginSchema } from "../helpers/FormSchema";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../context";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode, setMode } = useGlobalContext();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const response = await axios.post(
      "http://localhost:3000/user/signin",
      values
    );
    if (!response.data.msg) {
      setCookie("token", response.data.token, {path: '/'});
    }
    setMode("logged-in");
    navigate("/")
  };

  useEffect(() => {
    if(mode === "logged-in"){
      return navigate('/');
    }
  }, [])

  return (
    <>
      <div className="flex justify-center h-dvh items-center">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 font-semibold items-center">
              <CustomInput
                type="text"
                label="E-mail"
                name="username"
                placeholder="E-mail"
              />
              <CustomInput
                type="password"
                label="password"
                name="password"
                placeholder="Password"
              />
              <NavLink to="/login" className="hover:opacity-85 text-sm">
                not registered yet? signup
              </NavLink>
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  isSubmitting
                    ? "rounded-lg text-white bg-slate-800 px-10 py-3 opacity-35"
                    : "rounded-lg text-white bg-slate-800 px-10 py-3 hover:opacity-85"
                }
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
