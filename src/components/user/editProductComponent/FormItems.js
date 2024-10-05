import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// تعریف اعتبارسنجی با استفاده از yup
const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  price: yup.number().required('Price is required').min(1, 'Price must be at least 1').positive('Price must be positive'),
});

const FormsItems = ({ itemInfo, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,  // reset برای تنظیم مجدد مقادیر فرم
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // به‌روز رسانی مقادیر فرم وقتی itemInfo تغییر می‌کند
  useEffect(() => {
    if (itemInfo) {
      reset({
        title: itemInfo.title || '',
        description: itemInfo.description || '',
        price: itemInfo.price || 0,
      });
    }
  }, [itemInfo, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          {...register('title')}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          {...register('description')}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          {...register('price')}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Product
        </button>
      </div>
    </form>
  );
};

export default FormsItems;
