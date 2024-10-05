import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addToUser } from "../../redux/orebiSlice";

const SignUp = () => {
  // create dispatch for redux-toolkit in use funtion addtoUser
  const dispatch = useDispatch()
  // state success massage
  const [successMsg, setSuccessMsg] = useState('')

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Enter your name"),
    email: Yup.string().email("Enter a valid email").required("Enter your email"),
    password: Yup.string().min(6, "Passwords must be at least 6 characters").required("Create a password"),
  });

  const handleSignUp = (values, { setSubmitting, resetForm }) => {
    console.log('yeah')
    // وقتی اعتبارسنجی درست بود، اطلاعات را در یک آبجکت چاپ کنید
    const userInfo = {
      email: values.email,
      password: values.password,
      name: values.name
    };

    dispatch(addToUser(userInfo))
  
    // عملیات‌های دیگر
    setSuccessMsg(
      `Hello dear ${values.name}, Welcome you to OREBI Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${values.email}`
    );
    setSubmitting(false);
    resetForm();
  };
  

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          {/* Content omitted for brevity */}
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
      {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ): (
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="w-full h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                  Create your account
                </h1>
                <div className="flex flex-col gap-3">
                  {/* Client Name */}
                  <div className="flex flex-col gap-.5">
                    <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="clientName">Full Name</label>
                    <Field
                      name="name"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="eg. John Doe"
                    />
                    <ErrorMessage name="clientName" component="p" className="text-sm text-red-500 font-titleFont font-semibold px-4" />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-.5">
                    <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="email">Work Email</label>
                    <Field
                      name="email"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="email"
                      placeholder="john@workemail.com"
                    />
                    <ErrorMessage name="email" component="p" className="text-sm text-red-500 font-titleFont font-semibold px-4" />
                  </div>
                  {/* Password */}
                  <div className="flex flex-col gap-.5">
                    <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="password">Password</label>
                    <Field
                      name="password"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="password"
                      placeholder="Create password"
                    />
                    <ErrorMessage name="password" component="p" className="text-sm text-red-500 font-titleFont font-semibold px-4" />
                  </div>
                  {/* Checkbox */}
                  <div className="flex items-start mdl:items-center gap-2">
                    <Field type="checkbox" name="checked" className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer" />
                    <p className="text-sm text-primeColor">
                      I agree to the OREBI{" "}
                      <span className="text-blue-500">Terms of Service </span>and{" "}
                      <span className="text-blue-500">Privacy Policy</span>.
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                    } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                  >
                    Create Account
                  </button>
                  <p className="text-sm text-center font-titleFont font-medium">
                    Don't have an Account?{" "}
                    <Link to="/signin">
                      <span className="hover:text-blue-600 duration-300">Sign in</span>
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        )}
        
      </div>
    </div>
  );
};

export default SignUp;
