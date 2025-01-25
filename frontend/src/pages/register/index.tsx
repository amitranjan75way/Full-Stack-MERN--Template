import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useRegisterUserMutation } from '../../services/api';
import { login } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';

// Define the type for the form data
type FormData = {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
};

// Validation schema using yup
const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password must be at least 8 characters'),
  role: yup
    .string()
    .oneOf(['USER', 'ADMIN'], 'Invalid role')
    .required('Role is required'),
});

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation(); // Added isError and error
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { role: 'USER' }, // Default role set to USER
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form Submitted:', data);
    try {
      // Trigger the register API call
      const response = await registerUser(data).unwrap();
      console.log(response.data);

      // If registration is successful, dispatch login action to set user data in Redux
      dispatch(login({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }));

      window.localStorage.setItem('name', response.user.name);
      window.localStorage.setItem('email', response.user.email);
      window.localStorage.setItem('role', response.user.role);
      window.localStorage.setItem('accessToken', response.accessToken);
      window.localStorage.setItem('refreshToken', response.user.refreshToken);
      window.localStorage.setItem('isAuthenticated', 'true');

      toast.success('User Registered successfully');
      console.log('Registration successful:', response);
      reset();
      navigate('/');
    } catch (err) {
      if ((err as any)?.data?.err_code === 409) {
        toast.error('User already exists');
      } else {
        toast.error('Something went wrong, please try again');
      }
    }
  };

  return (
    <div className={style.signupContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>Welcome to Food Delivery App</h1>
        <p className={style.subHeader}>Register to get started!</p>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label>Enter Name</label>
            <input type="text" {...register('name')} placeholder="Your Name" />
            {errors.name && <p className={style.error}>{errors.name.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Enter Email</label>
            <input type="email" {...register('email')} placeholder="Your Email" />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          <div className={style.role}>
            <div className={style.title}>Select Role</div>
            <div className={style.radioGroup}>
              <input type="radio" id="user" value="USER" {...register('role')} />
              <label htmlFor="user" className={style.radioButton}>
                User
              </label>

              <input type="radio" id="admin" value="ADMIN" {...register('role')} />
              <label htmlFor="admin" className={style.radioButton}>
                Admin
              </label>
            </div>
          </div>

          <div className={style.inputGroup}>
            <label>Enter Password</label>
            <input type="password" {...register('password')} placeholder="Your Password" />
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
          </div>

          {isError && error && (
            <p className={style.error}>{error.data?.message || 'An error occurred!'}</p>
          )}

          <button type="submit" className={style.registerButton} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : <span>Register</span>}
          </button>
          <p>
            Already have an account?{' '}
            <a href="/login" className={style.loginButton}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
