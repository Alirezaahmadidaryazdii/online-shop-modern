import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Autocomplete, Button, TextField } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import toast from "react-hot-toast";

const Payment = () => {
  const options = ["Pay at home", "Payment by bank card"];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);


  const handleClick = ()=>{
    const dataTemp = JSON.parse(localStorage.getItem('storage'))
    dataTemp ? localStorage.setItem('storage', JSON.stringify([...dataTemp, ...products])) : localStorage.setItem('storage', JSON.stringify(products))
    dispatch(resetCart())
    toast.success('successfully pay')
  }
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <p>Payment gateway only applicable for Production build.</p>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300, my: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Controllable" />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <DatePicker />
          </LocalizationProvider>
        <div className="space-x-2 mt-4">
        <Button onClick={handleClick} variant="outlined" color="inherit">Complete the purchase</Button>
        <Link to="/">
          {/* <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button> */}
          <Button color="inherit" variant="contained" sx={{bgcolor: 'black', color: 'white'}}>expole more</Button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
