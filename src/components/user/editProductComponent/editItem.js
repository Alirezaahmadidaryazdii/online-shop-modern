import { useNavigate, useParams } from "react-router-dom";
import FormsItems from "./FormItems";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const EditItem = ()=>{
    const [dataItem, setDataItem] = useState([])
    const { itemId } = useParams();
    const navigate = useNavigate()
    
    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products/')
            .then(res=>res.json())
            .then(res=>{
                 const temp = res.filter(item=>{
                    return item.id === Number(itemId)
                })
                temp && setDataItem(temp[0])
            })
            .catch(err=>console.log(err))
    },[])

    const handleUpdateItem = (data)=>{
        console.log(data)
        const updatedProduct = {
            title: data.title,
            description: data.description,
            price: data.price,
          };
        toast.promise(
            fetch(`https://api.escuelajs.co/api/v1/products/${dataItem.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedProduct),
            }).then(async (response) => {
              if (!response.ok) {
                throw new Error('Failed to update product');
              }
              const result = await response.json();
              navigate('/user')
              return result; // Resolve with the result
            }),
            {
              loading: 'Updating product...',
              success: 'Product updated successfully!',
              error: (error) => `Error updating product: ${error.message}`,
            }
          )
    }
    return(
        <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Edit User</h1>
      {dataItem && <FormsItems itemInfo={dataItem} onSubmit={handleUpdateItem} />}
    </div>
    )
}
export default EditItem;