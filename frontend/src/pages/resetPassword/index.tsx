import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';
import { useResetPasswordMutation } from '../../services/authApi';

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

// Validation schema
const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  const { token } = useParams();

  // Get the mutation hook to reset the password
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  /**
  * Handles the form submission for resetting the user's password.
  * 
  * @async
  * @param {ResetPasswordFormData} data - The form data containing the user's new password and the confirmation of the password.
  * @returns {Promise<void>} - Resolves when the password is successfully reset and redirects the user to the login page.
  * @throws {Error} - Handles errors in the password reset process, showing a failure toast notification if the reset fails.
  */
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      // Call the resetPassword mutation with token from params
      await resetPassword({ token: token!, newPassword: data.newPassword }).unwrap();
      toast.success('Your password has been reset!');
      navigate('/login');
    } catch (err) {
      if((err as any)?.data?.error_code === 401) {
        toast.error("Link expired");
      }
      if((err as any)?.data?.error_code===500) {
        toast.error('Failed to reset password');
      }
    }
  };

  return (
    <motion.div
      className={style.resetPasswordContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.formWrapper}>
        <h1 className={style.header}>Reset Your Password</h1>
        <p className={style.subHeader}>Enter a new password below</p>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label>New Password</label>
            <input
              type="password"
              {...register('newPassword')}
              placeholder="Enter new password"
              className={errors.newPassword ? style.errorInput : ''}
            />
            {errors.newPassword && <p className={style.error}>{errors.newPassword.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm new password"
              className={errors.confirmPassword ? style.errorInput : ''}
            />
            {errors.confirmPassword && <p className={style.error}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className={style.submitButton} disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default ResetPassword;