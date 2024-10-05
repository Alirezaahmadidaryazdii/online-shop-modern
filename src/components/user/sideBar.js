import { useState } from "react";
import ListItem from "../designLayouts/ListItem";
// import icon mui
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RestoreIcon from "@mui/icons-material/Restore";
import LogoutIcon from "@mui/icons-material/Logout";
// import component
import Profile from "./profile";
import MyUsers from "./myUsers";
import MyProduct from "./myProduct";
import History from "./history";

import { BarChart } from "@mui/x-charts/BarChart";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";
import { clearUser, deleteUser, loginData } from "../../redux/orebiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SideBar = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [component, setComponent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const initialComponent = (id) => {
    id === 1
      ? setComponent(<Profile userInfo={data} />)
      : id === 2
      ? setComponent(<MyUsers />)
      : id === 3
      ? setComponent(<MyProduct />)
      : id === 4
      ? setComponent(<History />)
      : setComponent(null);

      if(id === 5){
        handleOpen()
      }
  };

  let listData = [
    { id: 1, icon: <AccountCircleIcon />, title: "My Profile", active: false },
    { id: 2, icon: <PeopleIcon />, title: "Users", active: true },
    {
      id: 3,
      icon: <AddShoppingCartIcon />,
      title: "My Products",
      active: true,
    },
    { id: 4, icon: <RestoreIcon />, title: "history", active: false },
    { id: 5, icon: <LogoutIcon />, title: "delete account", active: false },
  ];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = async()=>{
    const resultAction = await dispatch(loginData({ email: data?.email, password: data?.password }));

    if (loginData.fulfilled.match(resultAction)){
      const resultActionUpdated = await dispatch(deleteUser({id:data.id, token:resultAction.payload}));
      if (deleteUser.fulfilled.match(resultActionUpdated)) {
        toast.success("User deleted successfully!"); // پیام موفقیت
        navigate('/')
      } else {
        toast.error("delete failed!"); // پیام خطا
      }
    }
  }
  const handleOut = ()=>{
    dispatch(clearUser())
    navigate('/')
  }
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Button color="error" onClick={handleClose}>close</Button> */}
          <Box sx={style}>
            <Typography variant="subtitle1">Are you sure want to delete or out account?</Typography>
            <div className="flex space-x-2 mt-2 p-4 justify-center">
            <Button variant="contained" size="small" color="error" onClick={handleDelete}>delete</Button>
            <Button variant="contained" size="small" color="info" onClick={handleOut}>out</Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition duration-200 ease-in-out md:relative md:translate-x-0 w-64 bg-gray-800 text-white`}
        >
          <div className="p-6 text-xl font-bold sm:mt-6 md:mt-0">
            Admin Panel
          </div>
          <ul className="md:mt-6 sm:mt-0">
            {listData.map((item) =>
              data.role === "admin" ? (
                <li
                  onClick={() => initialComponent(item.id)}
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex flex-row gap-2"
                >
                  {item.icon}
                  {item.title}
                </li>
              ) : (
                item.active === false && (
                  <li
                    onClick={() => initialComponent(item.id)}
                    key={item.id}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex gap-2"
                  >
                    {item.icon}
                    {item.title}
                  </li>
                )
              )
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-800 focus:outline-none z-50"
            >
              {/* آیکون همبرگر */}
              {!sidebarOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
            <div className="text-xl font-semibold">Admin Panel</div>
          </div>
          {/* content */}
          {component ? (
            component
          ) : (
            <>
              <h1 className="mt-10 mx-3">your Activity:</h1>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34] },
                  { data: [51, 6, 49, 30] },
                  { data: [15, 25, 30, 50] },
                  { data: [60, 50, 15, 25] },
                ]}
                height={290}
                xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
                margin={{ top: 2, bottom: 30, left: 40, right: 10 }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SideBar;
