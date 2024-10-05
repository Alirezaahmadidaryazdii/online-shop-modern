import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import * as Yup from 'yup';  
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addToUser, checkUser } from "../../redux/orebiSlice";

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [successMsg, setSuccessMsg] = useState("");
  // YUP Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .required('Enter Email'),
    password: Yup.string()
      .required("Enter Password")
  });

  // React Hook Form integration with Yup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const { status } = useSelector((state) => state.orebiReducer);
  // Form submit function
  const onFormSubmit = async (data) => {
    try {
      const result = await dispatch(checkUser(data))
      console.log(result.payload)
    } catch (error) {
      console.error("Failed to check user:", error);
    }
  };
  
  useEffect(() => {
    console.log(status);
    if (status === 'Success') {
      navigate('/user')
      setSuccessMsg(
        `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at`
      );
    }
  }, [status]);
  

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          {/* Your additional content here */}
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
      {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) :(
          <form onSubmit={handleSubmit(onFormSubmit)} className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              {/* Email Input */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Work Email
                </p>
                <input
                  {...register("email")}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.email.message}
                  </p>
                )}
              </div>
          
              {/* Password Input */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  {...register("password")}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.password.message}
                  </p>
                )}
              </div>
          
              <button
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
                Sign In
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;





