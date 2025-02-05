import React from "react";
import { motion } from "framer-motion";
import style from "./index.module.css";

const ForgotPasswordSkeleton: React.FC = () => {
  return (
    <div className={style.forgotPasswordSkeletonContainer}>
      <motion.div
        className={style.forgotPasswordSkeletonWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={style.forgotPasswordSkeletonHeader} />
        <div className={style.forgotPasswordSkeletonSubHeader} />
        
        <div className={style.forgotPasswordSkeletonForm}>
          {/* Email Input Skeleton */}
          <div className={style.forgotPasswordSkeletonInput} />
          
          {/* Submit Button Skeleton */}
          <div className={style.forgotPasswordSkeletonButton} />
          
          {/* Login Link Skeleton */}
          <div className={style.forgotPasswordSkeletonLoginLink} />
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordSkeleton;
