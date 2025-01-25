import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
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

    // Query to fetch the list of restaurants
    getRestaurantList: builder.query({
      query: () => ({
        url: '/customer/restaurantList',
        method: 'GET',
      }),
    }),

    addMenuItem: builder.mutation({
      query: (data) => ({
        url: '/restaurant/add-item',
        method: 'POST',
        body: data
      })
    }),


  }),
});

// Export hooks for each API endpoint
export const {
  useRegisterUserMutation,
  useGetRestaurantListQuery,
  useLoginUserMutation,
  useAddMenuItemMutation
} = api;
