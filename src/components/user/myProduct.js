import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("descritpion is required"),
  price: yup.number("must the number price").required("price is required"),
});
const MyProduct = () => {
  const dispatch = useDispatch();
  const [dataCategory, setDataCategory] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [dataProducts, setDataProducts] = useState([])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    async function fetchCategory() {
      await fetch("https://api.escuelajs.co/api/v1/categories")
        .then((response) => response.json())
        .then((data) => setCategorys(data))
        .catch((error) => console.error("Error fetching products:", error));
    }
    fetchCategory();
  }, [categorys]);

  useEffect(()=>{
    async function fetchProducts() {
      await fetch('https://api.escuelajs.co/api/v1/products')
                  .then(res=>res.json())
                  .then(res=>setDataProducts(res))
                  .catch(err=>console.log(err))
    }
    fetchProducts();

  },[dataProducts])
  const handleSubmitCategory = (event) => {
    event.preventDefault();
    if (dataCategory) {
      let category = {
        name: dataCategory,
        image:
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      };
      toast
        .promise(
          fetch("https://api.escuelajs.co/api/v1/categories/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          }),
          {
            loading: "creating the category...",
            success: "the category successfuly added",
            error: "Error while creating category something was wrong",
          }
        )
        .then((result) => {
          console.log("Product added successfully:", result);
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    }
  };
  const handleDeleteCategory = (event) => {
    event.preventDefault();
    if (dataCategory) {
      console.log(categorys);
      let resultCategoryId = categorys.find(
        (item) => item.name === dataCategory
      );
      if (resultCategoryId == null) {
        toast.error("همچین دسته‌ای وجود ندارد");
        return;
      }
      toast
        .promise(
          fetch(
            `https://api.escuelajs.co/api/v1/categories/${resultCategoryId.id}`,
            {
              method: "DELETE",
            }
          ).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          }),
          {
            loading: "Deleting categoy...",
            success: "the category succesfuly delete",
            error: "error something was wrong",
          }
        )
        .then((result) => {
          console.log("Category deleted successfully", result);
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  const [selectCategory, setSelectCategory] = useState("");
  const onSubmit = (data) => {
    console.log(data);

    let resultCategory = categorys.find((item) => item.name === selectCategory);

    const updatedProduct = {
      title: data.name,
      price: Number(data.price),
      description: data.description,
      categoryId: resultCategory.id,
      images: [
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      ],
    };
    toast
      .promise(
        fetch("https://api.escuelajs.co/api/v1/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }),
        {
          loading: "adding the product...",
          success: "the product successfuly added",
          error: "Error something was wrong",
        }
      )
      .then((result) => {
        console.log("Product added successfully:", result);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };


  // delete product
  const handleDelteProduct = async(target) => {  
    console.log(target);  
    
    await toast.promise(  
        fetch(`https://api.escuelajs.co/api/v1/products/${target.id}`, {  
            method: 'DELETE'  
        }).then(res => {  
            if (!res.ok) { // بررسی وضعیت پاسخ  
                throw new Error(`HTTP error! status: ${res.status}`);  
            }  
            return res.json();  
        }).then(res => console.log(res))  
        .catch(err => {  
            console.log(err);  
            throw new Error(err.message); // خطا را پرتاب کنید تا در توست نمایش داده شود  
        }),  
        {  
            loading: 'loading ...',  
            success: 'the product successfully deleted',  
            error: (err) => `error: ${err.message}`,  
        }  
    );  
}
  const handleEditProduct = (item)=>{
    navigate(`/user/edit-product/${item.id}`)
  }
  return (
    <>
      <div className="flex justify-center align-items-center gap-5 mt-10 p-6 flex-col md:flex-row m-auto">
        <div className="bg-white rounded-lg shadow-lg max-w-xs space-y-4 p-6 mt-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Create Category
            </h2>
            <form>
              <label className="block text-gray-700">Name category</label>
              <input
                onChange={(e) => setDataCategory(e.target.value)}
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
              <p className="text-red-500 text-sm"></p>
              <div className="text-center mt-2 space-x-3 space-y-2">
                <button
                  onClick={handleSubmitCategory}
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create
                </button>
                <button
                  onClick={handleDeleteCategory}
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Form for editing user information */}
        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg max-w-xs space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Create product
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                {...register("description")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                {...register("price")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                onChange={(e) => setSelectCategory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              >
                {categorys.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <h1 className="my-3 text-center">Products</h1>
      <div className="overflow-y-auto h-96 border border-gray-300 rounded-lg shadow-md max-w-md my-10 mx-auto">
      <ul className="space-y-4">
          {dataProducts?.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.images[0]}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <p className="text-sm text-gray-400">category: {item.category.name}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                {/* Edit icon */}
                <button onClick={()=>handleEditProduct(item)} className="text-blue-500 hover:text-blue-700 transition">
                  <FaEdit size={20} />
                </button>
                {/* Trash icon */}
                <button onClick={()=>handleDelteProduct(item)} className="text-red-500 hover:text-red-700 transition">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </>
    
  );
};
export default MyProduct;
