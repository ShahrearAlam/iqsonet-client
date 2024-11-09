import { apiSlice } from "../api/apiSlice";


export const searchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Get search suggetion data
        searchSuggestions: builder.query({
            query: ({ query }) => ({
                url: `/frontend/search/suggestions?query=${query}`,
                method: 'GET',

            }),
            invalidatesTags: ["search"],
        }),
        // Add a new post (POST)
        detailedSearchAll: builder.query({
            query: ({ query }) => ({
                url: `/frontend/search/detailed/all?query=${query}`,
                method: 'GET',

            }),
            invalidatesTags: ["detailed"],
        }),





    })
})

// Export hooks for using the defined API endpoints
export const { useSearchSuggestionsQuery, useDetailedSearchAllQuery } = searchApiSlice