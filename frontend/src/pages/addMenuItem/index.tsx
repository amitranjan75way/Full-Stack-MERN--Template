import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.css';
import { useAddMenuItemMutation } from '../../services/api';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
}

const AddMenuItem: React.FC = () => {
  const [addMenuItem, { isLoading, isError, error, isSuccess }] = useAddMenuItemMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addMenuItem(data).unwrap(); // `unwrap` gives direct access to the response or throws an error
      reset(); // Reset form fields on success
      toast.success('Menu item added successfully!');
    } catch (err: any) {
      console.error('Error adding menu item:', err);
      toast.error('Failed to add menu item. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Menu Item</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Dish Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Dish Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Dish name is required' })}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        {/* Price */}
        <div className={styles.formGroup}>
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            {...register('price', { 
              required: 'Price is required', 
              min: { value: 0, message: 'Price must be positive' } 
            })}
          />
          {errors.price && <span className={styles.error}>{errors.price.message}</span>}
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Optional"
          />
        </div>

        {/* Availability */}
        <div className={styles.formGroup}>
          <label htmlFor="isAvailable">
            <input
              type="checkbox"
              id="isAvailable"
              {...register('isAvailable')}
            />
            Available
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading} // Disable button during API call
        >
          {isLoading ? 'Adding...' : 'Add Item'}
        </button>
      </form>

      {/* Error or Success Messages */}
      {isError && <p className={styles.error}>Failed to add menu item. Please try again.</p>}
      {isSuccess && <p className={styles.success}>Menu item added successfully!</p>}
    </div>
  );
};

export default AddMenuItem;
