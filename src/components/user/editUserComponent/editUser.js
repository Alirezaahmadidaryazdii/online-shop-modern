import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import UserForm from "./formUser"; // Import the reusable UserForm component
import { loginData, updatePromise } from "../../../redux/orebiSlice";

const EditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Fetch user data by ID
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/users/${userId}`);
      const result = await response.json();
      setUserData(result);
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = async (data) => {
    const updateUserInfo = {
      ...userData,
      email: data.email,
      name: data.name,
      password: data.password,
    };

    const resultAction = await dispatch(loginData({ email: userData?.email, password: userData?.password }));
  
    if (loginData.fulfilled.match(resultAction)) {
        console.log(userData)
        console.log('token:', resultAction.payload)
        console.log('updateUserInfo:', updateUserInfo)
        console.log('data:', data)
        const url = `https://api.escuelajs.co/api/v1/users/${updateUserInfo.id}`;
        try {
            const response = await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resultAction.payload}`,
              },
              body: JSON.stringify(updateUserInfo),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Error: ${errorData.message}`);
            }
      
            const data = await response.json();
            // بروزرسانی userInfo و localStorage
            localStorage.setItem('user', JSON.stringify(data)); // بروزرسانی در localStorage
            toast.success('User information updated successfully!');
            navigate('/user')
          } catch (error) {
            toast.error('Failed to update user information.');
          }
    }
    //   const resultActionUpdated = await dispatch(updatePromise({ userInfo: updateUserInfo, shouldSave: true }));
  
    //   if (updatePromise.fulfilled.match(resultActionUpdated)) {
    //     // setUpdatedUserInfo(resultActionUpdated.payload.user);
    //     toast.success("User updated successfully!");
    //   } else {
    //     toast.error("Update failed!");
    //   }
    // } else {
    //   toast.error('Login failed! Please check your credentials.');
    // }
  };


  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Edit User</h1>
      {userData && <UserForm userInfo={userData} onSubmit={handleUpdateUser} />}
    </div>
  );
};

export default EditUser;
