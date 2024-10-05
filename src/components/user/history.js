import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../assets/images/index";
import SampleNextArrow from "../home/NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../home/NewArrivals/SamplePrevArrow";
import Product from "../home/Products/Product";
const History = () => {
  const [productHistory, setProductHistory] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("storage"));
    data && setProductHistory(data);
  }, []);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  useEffect(() => console.log(productHistory), [productHistory]);
  return (
    <>
      <Typography variant="h5" sx={{ my: 4 }}>
        history:
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {productHistory.map((item) => (
    <div key={item.id} className="col-span-1">
      <Product
        _id={item.id}
        img={item.image}
        productName={item.name}
        price={item.price}
        color={item.color}
        badge={true}
        des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
      />
    </div>
  ))}
</div>

    </>
  );
};
export default History;
