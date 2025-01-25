import React from 'react';
import style from './index.module.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className={style.skeletonCard}>
      <div className={style.skeletonImage}></div>
      <div className={style.skeletonText}></div>
    </div>
  );
};

export default SkeletonCard;
