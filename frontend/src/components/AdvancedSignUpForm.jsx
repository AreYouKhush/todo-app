import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { FormSchema } from "../helpers/FormSchema";
import { NavLink, useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import axios from "axios";
import { useGlobalContext } from "../context";

const SignUp = () => {
  const navigate = useNavigate()
  const {mode} = useGlobalContext()

  const initialValues = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values, actions) => {
    const response = await axios.post(
      "http://localhost:3000/user/signup",
      values
    );
    if(response.data.msg === 'Success'){
      navigate('/login')
    }
  };

  useEffect(()=> {
    if(mode === "logged-in"){
      return navigate("/")
    }
  })

  return (
    <div className="flex justify-center h-dvh items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 font-semibold items-center">
            <CustomInput
              label="Name"
              name="name"
              type="text"
              placeholder="Name"
            />
            <CustomInput
              type="text"
              name="username"
              placeholder="Enter your email"
              label="E-mail"
            />
            <CustomInput
              type="password"
              name="password"
              placeholder="Enter your password"
              label="password"
            />
            <CustomInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              label="Confirm Password"
            />
            <NavLink to="/login" className="hover:opacity-85 text-sm">
              already registered? login
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
              SignUp
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
