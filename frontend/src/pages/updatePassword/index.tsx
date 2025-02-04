import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useUpdatePasswordMutation } from '../../services/userApi';
import ButtonLoader from '../../components/buttonLoader';
import style from './index.module.css';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(6, 'New Password must be at least 6 characters'),
});

// Define the form data type
type UpdatePasswordFormData = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<UpdatePasswordFormData>({
    resolver: yupResolver(validationSchema),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  /**
  * Handles the form submission for updating the user's password.
  * 
  * @async
  * @param {UpdatePasswordFormData} data - The form data containing the old and new passwords.
  * @returns {Promise<void>} - Resolves when the password is successfully updated and shows a success toast.
  * @throws {Error} - Handles errors in the password update process, showing an error toast notification if the update fails.
  */
  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async (data) => {
    const toastId = toast.loading('Updating password...');
    try {
      const response = await updatePassword(data).unwrap();
      toast.success('Password updated successfully!', { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update password', { id: toastId });
    }
  };

  return (
    <div className={style.updatePasswordContainer}>
      <motion.div
        className={style.formWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h1 className={style.header}>Update Password</h1>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password */}
          <div className={style.inputGroup}>
            <label>Old Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showOldPassword ? 'text' : 'password'}
                {...register('oldPassword')}
                placeholder="Enter Old Password"
              />
              <button
                type="button"
                className={style.eyeInsideInput}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.oldPassword && <p className={style.error}>{errors.oldPassword.message}</p>}
          </div>

          {/* New Password */}
          <div className={style.inputGroup}>
            <label>New Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
                placeholder="Enter New Password"
              />
              <button
                type="button"
                className={style.eyeInsideInput}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className={style.error}>{errors.newPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={style.updateButton}
            disabled={!isDirty || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? <ButtonLoader /> : 'Update Password'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
