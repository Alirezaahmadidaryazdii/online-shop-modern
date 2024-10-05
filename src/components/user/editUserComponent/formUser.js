
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
});

const UserForm = ({ userInfo, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: userInfo?.password,
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UserForm;
