import React from "react";
import { useFormik } from "formik";
import { FormSchema } from "../helpers/FormSchema";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      console.log("Submitted");
    },
  });
  return (
    <>
      <div className="flex justify-center h-dvh items-center">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 font-semibold items-center"
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name=""
              id="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.name && touched.name
                  ? "border-2 border-red-600 px-5 py-2 rounded-lg focus:bg-slate-300 "
                  : "px-5 py-2 rounded-lg border-2 border-slate-500 focus:bg-slate-300 "
              }
            />
            {errors.name && touched.name && (
              <p className="text-xs text-red-400 text-end">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name=""
              id="username"
              placeholder="Enter your email"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.username && touched.username
                  ? "border-2 border-red-600 px-5 py-2 rounded-lg focus:bg-slate-300 "
                  : "px-5 py-2 rounded-lg border-2 border-slate-500 focus:bg-slate-300 "
              }
            />
            {errors.username && touched.username && (
              <p className="text-xs text-red-400 text-end">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password
                  ? "border-2 border-red-600 px-5 py-2 rounded-lg focus:bg-slate-300 "
                  : "px-5 py-2 rounded-lg border-2 border-slate-500 focus:bg-slate-300 "
              }
            />
            {errors.password && touched.password && (
              <p className="text-xs text-red-400 text-end">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name=""
              id="confirmPassword"
              placeholder="Confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "border-2 border-red-600 px-5 py-2 rounded-lg focus:bg-slate-300 "
                  : "px-5 py-2 rounded-lg border-2 border-slate-500 focus:bg-slate-300 "
              }
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-xs text-red-400 text-end">
                {errors.confirmPassword}
              </p>
            )}
          </div>
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
        </form>
      </div>
    </>
  );
};

export default SignUp;
