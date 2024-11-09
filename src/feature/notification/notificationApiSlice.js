import { apiSlice } from "../api/apiSlice";


const networkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Get a list of notification
    getNotifications: builder.query({
      query: (id) => ({
        url: `/frontend/notifications/${id}`
      })
    }),

    // seen notification
    seenNotification: builder.mutation({
      query: (id) => ({
        url: `/frontend/notifications/seen_notification/${id}`,
        method: 'POST'
      })
    }),

    // read notification
    readNotification: builder.mutation({
      query: (id) => ({
        url: `/frontend/notifications/read_notification/${id}`,
        method: 'POST'
      })
    }),

  })
})


// Export hooks for using the defined API endpoints
export const {
  useGetNotificationsQuery,
  useSeenNotificationMutation,
  useReadNotificationMutation
} = networkApiSlice;
