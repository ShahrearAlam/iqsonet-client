import { accessToken } from "../../Utils/LocalStorage";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Register a new user (POST)
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/register',
        method: 'POST',
        body: data
      })
    }),

    // Login a user (POST)
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result?.data || {};

          dispatch(userLoggedIn({ access_token: undefined, user: undefined }))

          // Store authentication data in localStorage
          localStorage.setItem("iqNetAuth", JSON.stringify({ access_token: data.accessToken, refreshToken: data.refreshToken }))

          // Dispatch userLoggedIn action
          dispatch(userLoggedIn({ access_token: data.accessToken, user: data.user }))
        } catch (error) {
          console.error(error)
        }
      },
    }),

    // Fetch user data (GET)
    userData: builder.query({
      query: () => ({
        url: `/frontend/auth/userInfo`
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result?.data || {};

          // Dispatch userLoggedIn action
          dispatch(userLoggedIn({ access_token: accessToken(), user: data }))
        } catch (error) {
          console.error(error)
        }
      },
      providesTags: ["userInformation"],
    }),

    // Resend OTP (POST)
    otpResend: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/otp-resend',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["userInformation"]
    }),

    // Verify email with OTP (POST)
    emailVerification: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/otp-verify',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["userInformation"],
    }),

    // Request a password reset (POST)
    resetPasswordRequest: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/request-password-reset',
        method: 'POST',
        body: data
      })
    }),

    // Reset user's password (POST)
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/reset-password',
        method: 'POST',
        body: data
      }),
    }),

    // Authenticate with a social provider (POST)
    socialAuth: builder.mutation({
      query: (data) => ({
        url: '/frontend/auth/social-auth',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result?.data || {};

          // Store authentication data in localStorage
          localStorage.setItem("iqNetAuth", JSON.stringify({ access_token: data.accessToken, refreshToken: data.refreshToken }))

          // Dispatch userLoggedIn action
          dispatch(userLoggedIn({ access_token: data.accessToken, user: data.user }))
        } catch (error) {
          console.error(error)
        }
      },
    }),
  })
})


// Export hooks for using the defined API endpoints
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserDataQuery,
  useResetPasswordRequestMutation,
  useOtpResendMutation,
  useResetPasswordMutation,
  useEmailVerificationMutation,
  useSocialAuthMutation
} = authApiSlice
