import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';

const UpdatePasswordSkeleton: React.FC = () => {
  return (
    <div className={style.updatePasswordSkeletonContainer}>
      <motion.div
        className={style.updatePasswordSkeletonFormWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header Skeleton */}
        <div className={style.updatePasswordSkeletonHeader} />
        
        {/* Old Password Input Skeleton */}
        <div className={style.updatePasswordSkeletonInputGroup}>
          <div className={style.updatePasswordSkeletonSkeletonInput} />
        </div>

        {/* New Password Input Skeleton */}
        <div className={style.updatePasswordSkeletonInputGroup}>
          <div className={style.updatePasswordSkeletonSkeletonInput} />
        </div>

        {/* Submit Button Skeleton */}
        <div className={style.updatePasswordSkeletonSkeletonButton} />
      </motion.div>
    </div>
  );
};

export default UpdatePasswordSkeleton;
