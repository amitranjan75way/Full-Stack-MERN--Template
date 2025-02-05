import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';

const NotFoundSkeleton: React.FC = () => {
  return (
    <div className={style.notFoundSkeletonContainer}>
      <motion.div
        className={style.notFoundSkeletonWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* NotFound Title Skeleton */}
        <div className={style.notFoundSkeletonTitle} />

        {/* NotFound Description Skeleton */}
        <div className={style.notFoundSkeletonDescription} />

        {/* Go to Home Button Skeleton */}
        <div className={style.notFoundSkeletonHomeButton} />
      </motion.div>
    </div>
  );
};

export default NotFoundSkeleton;
