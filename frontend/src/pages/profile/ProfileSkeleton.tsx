import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className={style.profileSkeletonPage}>
      <motion.div
        className={style.profileSkeletonCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Profile Picture Skeleton */}
        <div className={style.profileSkeletonPicContainer}>
          <div className={style.profileSkeletonPic}></div>
        </div>

        {/* Profile Information Skeleton */}
        <div className={style.profileSkeletonInfoContainer}>
          <div className={style.profileSkeletonName}></div>
          <div className={style.profileSkeletonEmail}></div>
          <div className={style.profileSkeletonRole}></div>
        </div>

        {/* Profile Actions Skeleton */}
        <div className={style.profileSkeletonActionsContainer}>
          <div className={style.profileSkeletonButton}></div>
          <div className={style.profileSkeletonButton}></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSkeleton;
