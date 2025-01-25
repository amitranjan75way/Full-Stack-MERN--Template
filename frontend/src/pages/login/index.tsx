import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginUserMutation } from '../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useAppDispatch } from '../../store/store';
import { login } from '../../store/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

// Define the type for the form data
type LoginFormData = {
  email: string;
  password: string;
};

// Validation schema using yup
const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await loginUser(data).unwrap();
      console.log('Login successful:', result.data);
      dispatch(login({
        name: result.data.user.name,
        email: result.data.user.email,
        role: result.data.user.role,
        accessToken: result.data.accessToken,
        refreshToken: result.data.user.refreshToken,
      }));
      window.localStorage.setItem('name', result.data.user.name);
      window.localStorage.setItem('email', result.data.user.email);
      window.localStorage.setItem('role', result.data.user.role);
      window.localStorage.setItem('accessToken', result.data.accessToken);
      window.localStorage.setItem('refreshToken', result.data.user.refreshToken);
      window.localStorage.setItem('isAuthenticated', 'true');
      navigate('/');

      // Handle successful login, e.g., save token or redirect
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>Welcome Back!</h1>
        <p className={style.subHeader}>Log in to continue</p>

        {/* Login Form */}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label>Enter Email</label>
            <input type="email" {...register('email')} placeholder="Your Email" />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Enter Password</label>
            <input type="password" {...register('password')} placeholder="Your Password" />
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={style.loginButton} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          {/* Show error if login failed */}
          {error && <p className={style.error}>Login failed: {error.data?.message || 'Something went wrong'}</p>}

          {/* Register Button */}
          <div className={style.registerLink}>
            <p>Don't have an account? <a href="/register" className={style.registerButton}>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
