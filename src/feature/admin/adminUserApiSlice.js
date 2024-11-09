import { apiSlice } from "../api/apiSlice";


const adminUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Fetches a list of users.
    getUsers: builder.query({
      query: () => ({
        url: `/backend/users`
      }),
      providesTags: ["adminUsers"]
    }),

    // Deletes a user.
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/backend/users/${userId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["adminUsers"]
    })

  })
})


// Export hooks for using the defined API endpoints
export const {
  useGetUsersQuery,
  useDeleteUserMutation

} = adminUserApiSlice;
