import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { accessToken, refreshToken } from '../../Utils/LocalStorage';
import { userLoggedIn, userLoggedOut } from '../auth/authSlice';


const BaseUrl = import.meta.env.VITE_APP_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: (headers) => {
    const token = accessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {

  // Ensure extraOptions is defined and has headers
  if (!extraOptions) {
    extraOptions = {};
  }

  if (!extraOptions.headers) {
    extraOptions.headers = new Headers();
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired, attempt to renew
    const renewResult = await baseQuery({
      url: '/frontend/auth/renew',
      method: 'POST',
      body: { refreshToken: refreshToken() }
    }, api, extraOptions);

    if (renewResult.data) {
      const { user, accessToken, refreshToken } = renewResult.data.data;

      // Dispatch the userLoggedIn action and update localStorage
      api.dispatch(userLoggedIn({ access_token: accessToken, user }));
      localStorage.setItem("iqNetAuth", JSON.stringify({ access_token: accessToken, refreshToken }))

      // Set the new Authorization header with the renewed token
      extraOptions.headers.set('Authorization', `Bearer ${accessToken}`);

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Dispatch the userLoggedOut action
      api.dispatch(userLoggedOut())
    }
  }
  return result;
};


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnReconnect: true
});