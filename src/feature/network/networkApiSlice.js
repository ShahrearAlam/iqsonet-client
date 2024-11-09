import { apiSlice } from "../api/apiSlice";


const networkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Get a list of follow suggestions (GET)
    getFollowSuggestions: builder.query({
      query: () => ({
        url: `/frontend/connection/list/get-follow-suggestions`
      }),
      providesTags: ["followList"]
    }),

    // Send a follow request (POST)
    sendFollowRequest: builder.mutation({
      query: (id) => ({
        url: `/frontend/connection/send-follow-request/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ["followList", "request-status"]
    }),

    // Get a list of follow requests (GET)
    getFollowRequestsList: builder.query({
      query: () => ({
        url: `/frontend/connection/list/get-follow-requests`
      }),
      providesTags: ["followRequestList"]
    }),

    // Accept a follow request (POST)
    acceptFollowRequest: builder.mutation({
      query: (id) => ({
        url: `/frontend/connection/accept-follow-request/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ["followRequestList", "followersList"]
    }),

    // Cancel a follow request (POST)
    cancelFollowRequest: builder.mutation({
      query: (id) => ({
        url: `/frontend/connection/cancel-follow-request/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ["followRequestList"]
    }),

    // Get a list of followers for a specific user (GET)
    getFollowersList: builder.query({
      query: (id) => ({
        url: `/frontend/connection/list/get-followers/${id}`
      }),
      providesTags: ["followersList"]
    }),

    // Remove a follower (POST)
    removeFollower: builder.mutation({
      query: (id) => ({
        url: `/frontend/connection/remove-follower/${id}`,
        method: "POST"
      }),
      invalidatesTags: ["followersList"]
    }),

    // Get a list of users being followed by a specific user (GET)
    getFollowingList: builder.query({
      query: (id) => ({
        url: `/frontend/connection/list/get-following/${id}`
      }),
      providesTags: ["followingList"]
    }),

    // Unfollow a user (POST)
    unfollow: builder.mutation({
      query: (id) => ({
        url: `/frontend/connection/unfollow/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ["followList", "followingList", "followersList", "request-status"]
    }),


  })
})


// Export hooks for using the defined API endpoints
export const {
  useGetFollowSuggestionsQuery,
  useSendFollowRequestMutation,
  useGetFollowRequestsListQuery,
  useAcceptFollowRequestMutation,
  useCancelFollowRequestMutation,
  useGetFollowersListQuery,
  useRemoveFollowerMutation,
  useGetFollowingListQuery,
  useUnfollowMutation,
} = networkApiSlice;
