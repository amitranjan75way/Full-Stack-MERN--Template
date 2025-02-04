import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    // Mutation to register a new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Mutation to log in a user
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/users/login',
        method: 'POST',
        body: userData,
      }),
    }),

    // forgot password mutation
    forgotPassword: builder.mutation({
      query: (data)=> ({
        url: '/users/send-password-reset-link',
        method: 'POST',
        body: data,
      }),
    }),

    // reset password mutation
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/users/reset-password/${data.token}`,
        method: 'POST',
        body: {newPassword: data.newPassword},
      }),
    })

  }),
});

// Export hooks for each API endpoint
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
