import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { logout, resetTokens, setTokens } from "../store/reducers/authReducer";

const baseURL = "http://localhost:4000/api";

// Interface for the refresh token response
interface RefreshTokenResponse {
  _id: string;
  name: string;
  emai: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const refreshToken = state.auth.refreshToken;
    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }
    return headers;
  },
});

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result :", result?.error);
  if (result.error && result.error.status === 401) {
    // Access token expired, attempt to refresh
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;
    console.log(refreshToken);
    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await refreshTokenBaseQuery(
        {
          url: "/users/update-access-token",
          method: "POST",
        },
        api,
        extraOptions
      );

      if ((refreshResult.data as RefreshTokenResponse)) {
        // const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (
        //   refreshResult.data as RefreshTokenResponse
        // );

        console.log("new Access:", refreshResult.data.data.accessToken);
        console.log("new Refresh:", refreshResult.data.data.refreshToken);
        

        // Save new tokens in Redux state
        api.dispatch(
          setTokens({
            accessToken: refreshResult.data.data.accessToken,
            refreshToken: refreshResult.data.data.refreshToken,
          })
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, log the user out
        api.dispatch(resetTokens());
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, log the user out
     
      api.dispatch(resetTokens());
      api.dispatch(logout());
    }
  }

  return result;
};
