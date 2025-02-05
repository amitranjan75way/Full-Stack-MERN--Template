import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';

const ResetPasswordSkeleton: React.FC = () => {
  return (
    <div className={style.resetPasswordSkeletonContainer}>
      <motion.div
        className={style.resetPasswordSkeletonFormWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header Skeleton */}
        <div className={style.resetPasswordSkeletonHeader} />
        <div className={style.resetPasswordSkeletonSubHeader} />

        {/* Form Skeleton */}
        <form className={style.resetPasswordSkeletonForm}>
          {/* New Password Input Skeleton */}
          <div className={`${style.resetPasswordSkeletonInputGroup} ${style.resetPasswordSkeletonSkeletonInputGroup}`}>
            <div className={style.resetPasswordSkeletonSkeletonInput} />
          </div>

          {/* Confirm Password Input Skeleton */}
          <div className={`${style.resetPasswordSkeletonInputGroup} ${style.resetPasswordSkeletonSkeletonInputGroup}`}>
            <div className={style.resetPasswordSkeletonSkeletonInput} />
          </div>

          {/* Submit Button Skeleton */}
          <div className={style.resetPasswordSkeletonSkeletonButton} />
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordSkeleton;
