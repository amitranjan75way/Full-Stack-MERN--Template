import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';

const LoginFormSkeleton: React.FC = () => {
  return (
    <div className={style.loginFormSkeletonContainer}>
      <motion.div
        className={style.loginFormSkeletonFormWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header Skeleton */}
        <div className={style.loginFormSkeletonHeader} />
        <div className={style.loginFormSkeletonSubHeader} />

        {/* Form Skeleton */}
        <form className={style.loginFormSkeletonForm}>
          {/* Email Input Skeleton */}
          <div className={`${style.loginFormSkeletonInputGroup} ${style.loginFormSkeletonSkeletonInputGroup}`}>
            <div className={style.loginFormSkeletonSkeletonInput} />
          </div>

          {/* Password Input Skeleton */}
          <div className={`${style.loginFormSkeletonInputGroup} ${style.loginFormSkeletonSkeletonInputGroup}`}>
            <div className={style.loginFormSkeletonSkeletonInput} />
          </div>

          {/* Submit Button Skeleton */}
          <div className={style.loginFormSkeletonSkeletonButton} />

          {/* Forgot Password Link Skeleton */}
          <div className={style.loginFormSkeletonSkeletonForgotPassword} />

          {/* Register Link Skeleton */}
          <div className={style.loginFormSkeletonSkeletonRegisterLink} />
        </form>
      </motion.div>
    </div>
  );
};

export default LoginFormSkeleton;
