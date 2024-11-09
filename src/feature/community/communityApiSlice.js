import { apiSlice } from "../api/apiSlice";

export const communityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCommunity: builder.mutation({
      query: ({ bodyData }) => {
        return {
          url: `/frontend/community/create-community`,
          method: 'POST',
          headers: {},
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          body: bodyData,
          formData: true,
        };
      },
      invalidatesTags: ['Community'],
    }),

    getAllCommunity: builder.query({
      query: () => {
        return {
          url: `/frontend/community/all-community`,
          method: 'GET',
        };
      },
      providesTags: ['Community'],
    }),

    getCommunity: builder.query({
      query: ({ id }) => {
        return {
          url: `/frontend/community/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['SingleCommunity'],
    }),

    sendCommunityJoinRequest: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/frontend/community/${id}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['SingleCommunity', 'Community'],
    }),

    getAllCommunityRequest: builder.query({
      query: ({ id, query }) => {
        return {
          url: `/frontend/community/requests/${id}?query=${query}`,
          method: 'GET',
        };
      },
      providesTags: ['CommunityRequest'],
    }),

    requestAction: builder.mutation({
      query: ({ id, bodyData }) => {
        return {
          url: `/frontend/community/requests/${id}`,
          method: 'PATCH',
          body: bodyData
        };
      },
      invalidatesTags: ['CommunityRequest'],
    }),

    getCommunityPost: builder.query({
      query: ({ topic, groupId }) => {
        return {
          url: `/frontend/community/posts/${groupId}?topic=${topic}`,
          method: 'GET',
        };
      },
      providesTags: ['CommunityPosts'],
    }),

  })
})

export const {
  useCreateCommunityMutation,
  useGetAllCommunityQuery,
  useGetCommunityQuery,
  useSendCommunityJoinRequestMutation,
  useGetAllCommunityRequestQuery,
  useRequestActionMutation,
  useGetCommunityPostQuery,
} = communityApiSlice
