// reducers/resumeReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    personal: {
        fullname: '',
        position: '',
        contact: '',
        email: '',
        address: '',
        profilePicture: '',
        bio: ''
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {

        setPdfElementRef: (state, action) => {
            state.pdfElementRef = action.payload;
        },
        // Actions for Personal Information
        updatePersonalInfo: (state, action) => {
            state.personal = action.payload;
        },

        // Actions for Education
        addEducation: (state, action) => {
            state.education.push(action.payload);
        },
        removeEducation: (state, action) => {
            state.education = state.education.filter(
                (education) => education.id !== action.payload
            );
        },

        // Actions for Experience
        addExperience: (state, action) => {
            state.experience.push(action.payload);
        },
        removeExperience: (state, action) => {
            state.experience = state.experience.filter(
                (experience) => experience.id !== action.payload
            );
        },

        // Actions for Skills
        addSkill: (state, action) => {
            state.skills.push(action.payload);
        },
        removeSkill: (state, action) => {
            state.skills = state.skills.filter(
                (skill) => skill.id !== action.payload
            );
        },

        // Actions for Languages
        addLanguage: (state, action) => {
            state.languages.push(action.payload);
        },
        removeLanguage: (state, action) => {
            state.languages = state.languages.filter(
                (language) => language.id !== action.payload
            );
        },
        resetData: (state) => {
            state.education = [];
            state.experience = [];
            state.skills = [];
            state.languages = [];
        },
    },
});

export const {
    setPdfElementRef,
    updatePersonalInfo,
    addEducation,
    removeEducation,
    addExperience,
    removeExperience,
    addSkill,
    removeSkill,
    addLanguage,
    removeLanguage,
    resetData
} = resumeSlice.actions;

export default resumeSlice.reducer;
