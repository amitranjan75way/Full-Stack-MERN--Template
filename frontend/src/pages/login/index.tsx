import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginUserMutation } from '../../services/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useAppDispatch } from '../../store/store';
import { login } from '../../store/reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import ButtonLoader from '../../components/buttonLoader';
import { motion } from 'framer-motion';

// Define the type for the form data
type LoginFormData = {
  email: string;
  password: string;
};

// Validation schema using yup
const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();
  /**
   * Handles the form submission for the login process.
   * 
   * @async
   * @param {LoginFormData} data - The form data containing the user's email and password.
   * @returns {Promise<void>} - Resolves when the login is successful, storing user information in localStorage and navigating to the home page.
   * @throws {Error} - Throws an error if the login process fails. Specific error messages are shown for user not found, incorrect password, or generic failure.
   */

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await loginUser(data).unwrap();
      toast.success('Login successful!');
      dispatch(login(result.data));
      navigate('/');
    } catch (err) {
      const errorCode = (err as any)?.data?.error_code;
      if (errorCode === 404) {
        toast.error('User not found.');
      } else if (errorCode === 401) {
        toast.error('Incorrect password.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={style.loginContainer}>
      <motion.div
        className={style.formWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className={style.header}>Welcome Back!</h1>
        <p className={style.subHeader}>Log in to continue</p>

        {/* Login Form */}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${style.inputGroup} ${errors.email ? style.errorInputGroup : ''}`}>
            <label>Enter Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Your Email"
              className={errors.email ? style.errorInput : ''}
            />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          <div className={`${style.inputGroup} ${errors.password ? style.errorInputGroup : ''}`}>
            <label>Enter Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Your Password"
                className={`${style.passwordInput} ${errors.password ? style.errorInput : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={style.eyeIcon}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className={style.error}>{errors.password.message}</p>}

            {/* Forgot Password Link */}
            <motion.div
              className={style.forgotPassword}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/forgot-password">Forgot Password?</Link>
            </motion.div>
          </div>

          <button type="submit" className={style.loginButton} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : 'Log In'}
          </button>

          {/* Register Link */}
          <div className={style.registerLink}>
            <p>
              Don't have an account?{' '}
              <Link to="/register" className={style.registerButton}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
