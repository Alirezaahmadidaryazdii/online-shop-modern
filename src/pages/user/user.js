import { useEffect, useState } from "react";

import Header from "../../components/home/Header/Header";

import SideBar from "../../components/user/sideBar";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate()
  const [info, setInfo] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const persistedData = localStorage.getItem("persist:root");

      if (persistedData) {
        const parsedData = JSON.parse(persistedData);
        const userInfo = JSON.parse(parsedData.userInfo);
        if(userInfo.length === 0)navigate('/signin')
        else setInfo(userInfo);
      }

    }, 1000);
  }, []);

  return (
    <>
      <SideBar data={info} />
    </>
  );
}

export default User;
