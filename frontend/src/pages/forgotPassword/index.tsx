import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../../services/authApi";
import ButtonLoader from "../../components/buttonLoader";
import style from "./index.module.css";

// Form Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

// Define Form Data Type
type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(validationSchema),
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();


  /**
   * Handles form submission for the forgot password process.
   * 
   * @async
   * @param {ForgotPasswordFormData} data - The form data containing the user's email.
   * @returns {Promise<void>} - Resolves when the password reset link is sent successfully or throws an error if the process fails.
   * @throws {Error} - Throws an error if the password reset link sending process fails.
   */
  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await forgotPassword(data).unwrap();
      toast.success("Password reset link sent!", { id: toastId });

    } catch (err: any) {
      console.log("Error in forgot password:", err);
      toast.error(err?.data?.message || "Failed to send reset link", {
        id: toastId,
      });
    }
  };

  return (
    <div className={style.forgotPasswordContainer}>
      <motion.div
        className={style.formWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={style.header}>Forgot Password</h1>
        <p className={style.subHeader}>Enter your email to reset your password</p>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className={style.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={errors.email ? style.errorInput : ""}
            />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className={style.submitButton} disabled={!isDirty || isLoading}>
            {isLoading ? <ButtonLoader /> : "Send Reset Link"}
          </button>

          {/* Login Link */}
          <div className={style.loginLink}>
            <p>
              Remember your password?{" "}
              <Link to="/login" className={style.loginButton}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
