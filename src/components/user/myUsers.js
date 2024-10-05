import { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import icons from react-icons
import { useDispatch } from "react-redux";
import { deleteUser, loginData } from "../../redux/orebiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyUsers = () => {
    const dispatch = useDispatch()
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate()
  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/users");
      const data = await response.json();
      setUsersData(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userInfo) => {
    const resultAction = await dispatch(loginData({ email: userInfo?.email, password: userInfo?.password }));
    console.log(resultAction);
  
    if (loginData.fulfilled.match(resultAction)) {
      const resultActionUpdated = await dispatch(deleteUser({id:userInfo.id, token:resultAction.payload}));
  
      // فقط اگر به‌روزرسانی موفق بود، اطلاعات جدید را تنظیم کنید
      if (deleteUser.fulfilled.match(resultActionUpdated)) {
        // حذف کاربر از usersData
        setUsersData((prevData) => prevData.filter(user => user.id !== userInfo.id));
        toast.success("User deleted successfully!"); // پیام موفقیت
      } else {
        toast.error("delete failed!"); // پیام خطا
      }
  
    } else {
      // ورود ناموفق
      toast.error('Login failed! Please check your credentials.');
    }
  };

  const handleEditUser = (userId) => {
    // Navigate to edit user page
    navigate(`/user/edit/${userId}`);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-6">User List</h1>
      {/* Scrollable section */}
      <div className="max-h-[500px] overflow-y-auto">
        <ul className="space-y-4">
          {usersData.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400">Role: {user.role}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                {/* Edit icon */}
                <button onClick={()=>handleEditUser(user.id)} className="text-blue-500 hover:text-blue-700 transition">
                  <FaEdit size={20} />
                </button>
                {/* Trash icon */}
                <button onClick={()=>handleDeleteUser(user)} className="text-red-500 hover:text-red-700 transition">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyUsers;
