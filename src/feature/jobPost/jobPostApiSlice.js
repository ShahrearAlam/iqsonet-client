import { apiSlice } from "../api/apiSlice";


const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Send create job
        addJobPost: builder.mutation({
            query: (formData) => ({
                url: `/frontend/jobPost/create-job`,
                method: 'POST',
                body: formData,
                formData: true
            }),
            invalidatesTags: ["postjobs"]
        }),

        // Edit Job
        updateJobPost: builder.mutation({
            query: ({ formData, jobPostId }) => ({
                url: `/frontend/jobPost/update-jobPost/${jobPostId}`,
                method: 'PATCH',
                body: formData,
                formData: true
            }),
            invalidatesTags: ["postjobs", "singleJob"]
        }),

        // Get the job data
        getJobPosts: builder.query({
            query: ({ page, queryString }) => ({
                url: `/frontend/jobPost/job-posts?${queryString}&page=${page}`,
            }),
            providesTags: ["postjobs"]
        }),

        // Get single Job post
        getSingleJobPost: builder.query({
            query: (jobPostId) => ({
                url: `/frontend/jobPost/job-post/${jobPostId}`,
            }),
            providesTags: ["singleJob"]
        }),



        // Get search Organizations
        searchOrganizations: builder.query({
            query: (query) => ({
                url: `/frontend/jobPost/search-organization?query=${query}`,
            }),
            providesTags: ["searchOrganizations"]
        }),

        // job Apply
        jobApply: builder.mutation({
            query: ({ jobPostId, formData }) => ({
                url: `/frontend/jobPost/apply/${jobPostId}`,
                method: 'POST',
                body: formData,
                formData: true
            }),
            invalidatesTags: ["postjobs", "singleJob"]
        }),

        // Get applied jobs (candidate applied jobs)
        getAppliedJobs: builder.query({
            query: () => ({
                url: `/frontend/jobPost/applied-jobs`,
            })
        }),

        // Get single applicant Data(get single applied job)
        getApplicantData: builder.query({
            query: (applicantId) => ({
                url: `/frontend/jobPost/applicant/${applicantId}`,
            })
        }),

        // Get Posted Jobs(hiring get all posted jobs)
        getPostedJobs: builder.query({
            query: () => ({
                url: `/frontend/jobPost/posted-jobs`,
            }),
            providesTags: ["postjobs"]
        }),

        // Delete posted Job 
        deleteJobPost: builder.mutation({
            query: (jobPostId) => ({
                url: `frontend/jobPost/delete-jobPost/${jobPostId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["postjobs"]
        }),

        // Get Job Applicants Data(hiring get sigle posted jobs)
        getJobApplicants: builder.query({
            query: (jobPostId) => ({
                url: `/frontend/jobPost/applicants/${jobPostId}`,
            }),
            providesTags: ["singleJob"]
        }),

    })
})


// Export hooks for using the defined API endpoints
export const {
    useAddJobPostMutation,
    useGetJobPostsQuery,
    useGetSingleJobPostQuery,
    useSearchOrganizationsQuery,
    useJobApplyMutation,
    useGetAppliedJobsQuery,
    useGetApplicantDataQuery,
    useGetPostedJobsQuery,
    useGetJobApplicantsQuery,
    useDeleteJobPostMutation,
    useUpdateJobPostMutation
} = jobApiSlice;
