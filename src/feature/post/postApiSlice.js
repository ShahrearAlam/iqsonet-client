import { apiSlice } from "../api/apiSlice";


export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Add a new post (POST)
    addPost: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/add-post`,
        method: 'POST',
        body: data
      })
    }),

    // Get posts by user ID (GET)
    getPostByUserId: builder.query({
      query: ({ userId, page }) => ({
        url: `/frontend/posts/get-posts/${userId}?page=${page}`,
      }),
      providesTags: ["post"]
    }),

    // Get Single post by postId (GET)
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/frontend/posts/get-post/${id}`,
      }),
      providesTags: ["singlePost"]
    }),

    // Add a reaction to a post (POST)
    addPostReaction: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/post-reaction`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Edit a post (PUT)
    editPost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/frontend/posts/update-post/${id}`,
        method: 'PUT',
        body: data
      })
    }),

    // Delete a post (DELETE)
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/frontend/posts/delete-post/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["post"]
    }),


    // adding post comment
    addComment: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/add-comment`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Update Comment
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/update-comment`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Delete a Comment
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/delete-comment`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Add a reaction to a Comment (POST)
    addCommentReaction: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/comment-reaction`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // adding Reply
    addReply: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/add-reply`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Update Reply
    updateReply: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/update-reply`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Delete  Reply
    deleteReply: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/delete-reply`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),

    // Add a reaction to a Reply (POST)
    addReplyReaction: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/reply-reaction`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["singlePost"]
    }),


    // Get News Feed Data
    getNewsFeed: builder.query({
      query: (page) => ({
        url: `/frontend/posts/get-newsfeed?page=${page}`
      }),
      providesTags: ["feed"]
    }),


    // Get User points
    getUserPoints: builder.query({
      query: (id) => ({
        url: `/frontend/profile/points/${id}`
      }),
      providesTags: ["userPoints"]
    }),

    // Get a post in save page.
    getSavePosts: builder.query({
      query: (page) => ({
        url: `/frontend/posts/saved?page=${page}`
      }),
      providesTags: ["savePost"]
    }),

    // Get a single save post.
    getSavePost: builder.query({
      query: (postId) => ({
        url: `/frontend/posts/saved/${postId}`
      }),
      providesTags: ["single-savePost"]
    }),

    // Add a post in save page.
    savePost: builder.mutation({
      query: (postId) => ({
        url: `/frontend/posts/save/${postId}`,
        method: 'POST'
      }),
      invalidatesTags: ["single-savePost"]
    }),

    // Delete save post in save page.
    deleteSavePost: builder.mutation({
      query: (postId) => ({
        url: `/frontend/posts/unsave/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["savePost", "single-savePost"]
    }),


    // Creates a report for a specific post.
    createPostReport: builder.mutation({
      query: (data) => ({
        url: `/frontend/posts/report`,
        method: 'POST',
        body: data
      })
    }),


    // Share Post
    sharePost: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/frontend/posts/share-post/${postId}`,
        method: 'POST',
        body: data
      })
    }),

  })
})

// Export hooks for using the defined API endpoints
export const {
  useAddPostMutation,
  useGetPostByUserIdQuery,
  useGetSinglePostQuery,
  useAddPostReactionMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useAddCommentReactionMutation,
  useAddReplyMutation,
  useDeleteReplyMutation,
  useUpdateReplyMutation,
  useAddReplyReactionMutation,
  useGetNewsFeedQuery,
  useGetUserPointsQuery,
  useSavePostMutation,
  useDeleteSavePostMutation,
  useGetSavePostsQuery,
  useCreatePostReportMutation,
  useSharePostMutation,
  useGetSavePostQuery
} = postApiSlice
