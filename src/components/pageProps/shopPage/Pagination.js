

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems, returnProducts } from "../../../constants"; // فقط اگر نیاز به fetch داده‌ها از API باشد
import Skeleton from "@mui/material/Skeleton"; // اضافه کردن Skeleton از MUI

const Pagination = ({ itemsPerPage, selectedOption }) => {
  const [items, setItems] = useState([]); // برای نگهداری داده‌های بارگذاری شده
  const [loading, setLoading] = useState(true); // مدیریت حالت لودینگ
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // بارگذاری داده‌ها به صورت async
  const fetchData = async () => {
    setLoading(true); // فعال کردن حالت لودینگ
    const data = await returnProducts(); // بارگذاری داده‌ها با await
    if (selectedOption === 'defualt') {
      setItems(data); // تنظیم داده‌ها در state
    } else {
      const filtered = data.filter(item => item.category.name === selectedOption);
      setItems(filtered);
    }
    setLoading(false); // غیر فعال کردن حالت لودینگ پس از دریافت داده‌ها
  };

  useEffect(() => {
    fetchData(); // فراخوانی تابع بارگذاری داده‌ها
  }, [selectedOption]); // فراخوانی مجدد با تغییر selectedOption

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {loading ? <LoadingItems /> : <Items currentItems={currentItems} />}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item.id}
              img={item.images[0] || 'https://via.placeholder.com/150?text=No+Image'}
              productName={item.title}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.description}
            />
          </div>
        ))}
    </>
  );
}

// کامپوننت برای حالت لودینگ
function LoadingItems() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-full p-4 bg-gray-900 rounded-lg shadow-md" // استایل پس‌زمینه مشکی برای کارت
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={250}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)", // رنگ تیره برای Skeleton
              borderRadius: "8px", // گرد کردن گوشه‌ها
            }}
          />
          <div className="mt-4">
            <Skeleton
              variant="text"
              width="80%"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)", // کمی روشن‌تر برای متن
              }}
            />
            <Skeleton
              variant="text"
              width="60%"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)", // کمی روشن‌تر برای متن
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default Pagination;
