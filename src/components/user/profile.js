// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch, useSelector } from "react-redux";
// import { loginData } from "../../redux/orebiSlice";
// import { updatePromise } from "../../redux/orebiSlice";
// import toast from "react-hot-toast";
// import { useState } from "react";
// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email format").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const Profile = ({ userInfo }) => {
//     const [UpdatedUserInfo,setUpdatedUserInfo] = useState(userInfo)
//     const dispatch = useDispatch()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       name: userInfo?.name,
//       email: userInfo?.email,
//       password: userInfo?.password,
//     },
//   });

//   const onSubmit = async (data) => {
//     console.log(data);
//     const updateUserInfo = {
//       ...userInfo,
//       email: data.email,
//       name: data.name,
//       password: data.password
//     };
  
//     const resultAction = await dispatch(loginData({ email: userInfo?.email, password: userInfo?.password }));
//     console.log(resultAction);
  
//     if (loginData.fulfilled.match(resultAction)) {
//       const resultActionUpdated = await dispatch(updatePromise(updateUserInfo));
  
//       // فقط اگر به‌روزرسانی موفق بود، اطلاعات جدید را تنظیم کنید
//       if (updatePromise.fulfilled.match(resultActionUpdated)) {
//         setUpdatedUserInfo(resultActionUpdated.payload.user);
//       } else {
//         toast.error("Update failed!");
//       }
  
//     } else {
//       // ورود ناموفق
//       toast.error('Login failed! Please check your credentials.');
//     }
//   };
  

//   return (
//     <div className="flex justify-center align-items-center gap-5 mt-10 p-6 flex-col md:flex-row m-auto">
//       <div className="bg-white rounded-lg shadow-lg max-w-xs space-y-4 p-6 mt-6">
//         <div className="flex justify-center">
//           <img
//             src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
//             className="rounded-full w-24 h-24 border-2 border-gray-300"
//             alt="Profile"
//           />
//         </div>
//         <div className="text-center space-y-2">
//           <p className="text-xl font-semibold text-gray-800">Role: {UpdatedUserInfo?.role}</p>
//           <p className="text-lg text-gray-600">Name: {UpdatedUserInfo?.name}</p>
//           <p className="text-lg text-gray-600">Email: {UpdatedUserInfo?.email}</p>
//           <p className="text-lg text-gray-600">Password: {UpdatedUserInfo?.password}</p>
//         </div>
//       </div>

//       {/* Form for editing user information */}
//       <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg max-w-xs space-y-4">
//         <h2 className="text-lg font-semibold text-gray-800 text-center">Edit Profile</h2>
//         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               {...register("name")}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register("email")}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               {...register("password")}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginData, updatePromise } from "../../redux/orebiSlice";
import toast from "react-hot-toast";
import UserForm from "./editUserComponent/formUser"; // Import the reusable UserForm component

const Profile = ({ userInfo }) => {
  const [UpdatedUserInfo, setUpdatedUserInfo] = useState(userInfo);
  const dispatch = useDispatch();

  const handleUpdateUser = async (data) => {
    const updateUserInfo = {
      ...userInfo,
      email: data.email,
      name: data.name,
      password: data.password,
    };

    const resultAction = await dispatch(loginData({ email: userInfo?.email, password: userInfo?.password }));
  
    if (loginData.fulfilled.match(resultAction)) {
      const resultActionUpdated = await dispatch(updatePromise(updateUserInfo));
  
      if (updatePromise.fulfilled.match(resultActionUpdated)) {
        setUpdatedUserInfo(resultActionUpdated.payload.user);
        toast.success("User updated successfully!");
      } else {
        toast.error("Update failed!");
      }
    } else {
      toast.error('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center align-items-center gap-5 mt-10 p-6 flex-col md:flex-row m-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-xs space-y-4 p-6 mt-6">
        {/* User Profile Display */}
        <div className="flex justify-center">
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            className="rounded-full w-24 h-24 border-2 border-gray-300"
            alt="Profile"
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-gray-800">Role: {UpdatedUserInfo?.role}</p>
          <p className="text-lg text-gray-600">Name: {UpdatedUserInfo?.name}</p>
          <p className="text-lg text-gray-600">Email: {UpdatedUserInfo?.email}</p>
          <p className="text-lg text-gray-600">Password: {UpdatedUserInfo?.password}</p>
        </div>
      </div>

      {/* Form for editing user information */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg max-w-xs space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 text-center">Edit Profile</h2>
        <UserForm userInfo={UpdatedUserInfo} onSubmit={handleUpdateUser} />
      </div>
    </div>
  );
};

export default Profile;
