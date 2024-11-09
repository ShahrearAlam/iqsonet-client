import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({

		// Get profile data (GET)
		getProfileData: builder.query({
			query: (id) => ({
				url: `/frontend/profile/get-profile/${id}`
			}),
			providesTags: ["profileData"]
		}),

		// Edit profile (PUT)
		profileEdit: builder.mutation({
			query: ({ id, data }) => ({
				url: `/frontend/profile/edit-profile/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ["profileData"]
		}),

		// Upload profile picture (POST)
		profilePictureUpload: builder.mutation({
			query: (formData) => ({
				url: `/frontend/profile/upload-profile-picture`,
				method: 'POST',
				body: formData,
				formData: true
			})
		}),

		// Add organization in profile (POST)
		addOrganization: builder.mutation({
			query: (data) => ({
				url: `/frontend/profile/add-work`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ["profileData"]
		}),

		// Edit organization in profile (POST)
		editOrganization: builder.mutation({
			query: ({ id, data }) => ({
				url: `/frontend/profile/update-work/${id}`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ["profileData"]
		}),

		// Delete organization in profile (POST)
		deleteOrganization: builder.mutation({
			query: (id) => ({
				url: `/frontend/profile/delete-work/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ["profileData"]
		}),

		// Add education in profile (POST)
		addEducation: builder.mutation({
			query: (data) => ({
				url: `/frontend/profile/add-education`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ["profileData"]
		}),

		// Edit education in profile (POST)
		editEducation: builder.mutation({
			query: ({ id, data }) => ({
				url: `/frontend/profile/update-education/${id}`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ["profileData"]
		}),

		// Delete education in profile (POST)
		deleteEducation: builder.mutation({
			query: (id) => ({
				url: `/frontend/profile/delete-education/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ["profileData"]
		})
	})
})


// Export hooks for using the defined API endpoints
export const {
	useProfileEditMutation,
	useProfilePictureUploadMutation,
	useAddEducationMutation,
	useAddOrganizationMutation,
	useGetProfileDataQuery,
	useEditEducationMutation,
	useDeleteEducationMutation,
	useEditOrganizationMutation,
	useDeleteOrganizationMutation
} = authApiSlice;
