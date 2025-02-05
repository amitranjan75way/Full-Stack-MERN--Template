import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';

const RegisterFormSkeleton: React.FC = () => {
  return (
    <div className={style.registerFormSkeletonContainer}>
      <motion.div
        className={style.registerFormSkeletonFormWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header Skeleton */}
        <div className={style.registerFormSkeletonHeader} />
        <div className={style.registerFormSkeletonSubHeader} />

        {/* Form Skeleton */}
        <form className={style.registerFormSkeletonForm}>
          {/* Name Input Skeleton */}
          <div className={`${style.registerFormSkeletonInputGroup} ${style.registerFormSkeletonSkeletonInputGroup}`}>
            <div className={style.registerFormSkeletonSkeletonInput} />
          </div>

          {/* Email Input Skeleton */}
          <div className={`${style.registerFormSkeletonInputGroup} ${style.registerFormSkeletonSkeletonInputGroup}`}>
            <div className={style.registerFormSkeletonSkeletonInput} />
          </div>

          {/* Password Input Skeleton */}
          <div className={`${style.registerFormSkeletonInputGroup} ${style.registerFormSkeletonSkeletonInputGroup}`}>
            <div className={style.registerFormSkeletonSkeletonInput} />
          </div>

          {/* Confirm Password Input Skeleton */}
          <div className={`${style.registerFormSkeletonInputGroup} ${style.registerFormSkeletonSkeletonInputGroup}`}>
            <div className={style.registerFormSkeletonSkeletonInput} />
          </div>

          {/* Submit Button Skeleton */}
          <div className={style.registerFormSkeletonSkeletonButton} />

          {/* Login Link Skeleton */}
          <div className={style.registerFormSkeletonSkeletonLoginLink} />
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterFormSkeleton;
