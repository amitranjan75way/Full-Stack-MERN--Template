import React, { useState } from 'react';
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
  role: 'CUSTOMER' | 'RESTAURANT' | 'DELIVERY_STAFF';
};

// Validation schema using yup
const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password must be at least 1 characters'),
});

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'RESTAURANT' | 'DELIVERY_STAFF'>('CUSTOMER');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form Submitted:', { ...data, role: selectedRole });
    try {
      // Trigger the register API call
      const response = await registerUser({...data, role: selectedRole}).unwrap();  // unwrap() is used to directly access the result
      console.log(response);
      // If registration is successful, dispatch login action to set user data in Redux
      dispatch(login({
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role,
        accessToken: response.data.accessToken,
        refreshToken: response.data.user.refreshToken,
      }));
      window.localStorage.setItem('name', response.data.user.name);
      window.localStorage.setItem('email', response.data.user.email);
      window.localStorage.setItem('role', response.data.user.role);
      window.localStorage.setItem('accessToken', response.data.accessToken);
      window.localStorage.setItem('refreshToken', response.data.user.refreshToken);
      window.localStorage.setItem('isAuthenticated', 'true');

      toast.success("User Registered successfully")
      console.log('Registration successful:', response);
      reset();
      navigate('/');

      // Handle any post-registration actions like redirecting to login page or home page
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err && (err as any).data.err_code === 409) {
        toast.error("User alredy exists");
      }
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className={style.signupContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>Welcome to Food Delivery App</h1>
        <p className={style.subHeader}>Register to get started!</p>


        <div className={style.roleSelection}>
          {['CUSTOMER', 'RESTAURANT', 'DELIVERY_STAFF'].map((role) => (
            <div
              key={role}
              className={`${style.roleButton} ${selectedRole === role ? style.activeRole : ''}`}
              onClick={() => setSelectedRole(role as 'CUSTOMER' | 'RESTAURANT' | 'DELIVERY_STAFF')}
            >
              {role === 'CUSTOMER' ? 'Customer' : role === 'RESTAURANT' ? 'Restaurant' : 'Delivery Staff'}
            </div>
          ))}
        </div>


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

          <div className={style.inputGroup}>
            <label>Enter Password</label>
            <input type="password" {...register('password')} placeholder="Your Password" />
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={style.registerButton} disabled={isLoading}>
            {
              isLoading ? <ButtonLoader /> : <span>Register</span>
            }
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
