import { apiSlice } from "../api/apiSlice";


const adminReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Fetches a list of reported user posts.
    getReportedUserPosts: builder.query({
      query: () => ({
        url: `/backend/posts/reports`
      }),
      providesTags: ["adminReports"]
    }),

    // Remove a post based on a report.
    removePostByReport: builder.mutation({
      query: (reportId) => ({
        url: `/backend/posts/reported_post/hide/${reportId}`,
        method: "POST"
      }),
      invalidatesTags: ["adminReports"]
    }),

    // Deletes a post report.
    deletePostReport: builder.mutation({
      query: (reportId) => ({
        url: `/backend/posts/reports/${reportId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["adminReports"]
    })

  })
})


// Export hooks for using the defined API endpoints
export const {
  useGetReportedUserPostsQuery,
  useRemovePostByReportMutation,
  useDeletePostReportMutation

} = adminReportApiSlice;
