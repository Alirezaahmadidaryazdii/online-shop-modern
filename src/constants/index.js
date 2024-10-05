import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../assets/images/index";

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
  },
  {
    _id: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "About",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Contact",
    link: "contact",
  },
  {
    _id: 1005,
    title: "Journal",
    link: "/journal",
  },
];
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: newArrFour,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== Special Offer data End here ==============


const dataProducts = [];

export async function returnProducts() {
  if (dataProducts.length === 0) {
    let response = await fetch('https://api.escuelajs.co/api/v1/products/');
    let data = await response.json();
    if (data) {
      dataProducts.push(...data); // Store fetched data in dataProducts
      return dataProducts;
    }
  } else {
    return dataProducts;
  }
}


// returning data user
let usersData = [];

export const returnDataUser = async () => {
  // اگر usersData خالی باشد، fetch انجام می‌شود
  if (usersData.length === 0) {
    const response = await fetch('https://api.escuelajs.co/api/v1/users');
    const data = await response.json();
    usersData = data; // ذخیره داده‌ها در usersData
  }

  return usersData; // برگرداندن usersData (چه fetch انجام شود و چه نه)
};

const categorys = [];

export const returnCategory = async()=>{
  if(categorys.length === 0){
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    const data = await response.json()
    if(data){
      categorys.push(...data)
      return categorys;
    }
  }else{
    return categorys;
  }

}
