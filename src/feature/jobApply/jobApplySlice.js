import { createSlice } from '@reduxjs/toolkit';

const jobApplySlice = createSlice({
    name: 'app',
    initialState: {
        jobApplyModalOpen: false,
        currentStep: 1,
        inCompleteJobs: []
    },
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setJobApplyModalOpen: (state, action) => {
            state.jobApplyModalOpen = action.payload;
        },
        // For questions
        setAssessmentData: (state, action) => {
            const { questionsAndAnswers, jobId, jobDetails } = action.payload;
            const existingJob = state.inCompleteJobs.find((job) => job.jobId === jobId);
            if (existingJob) {
                existingJob.assessment = questionsAndAnswers;
                existingJob.step = 2
            } else {
                state.inCompleteJobs.push({
                    jobId: jobId,
                    jobDetails: jobDetails,
                    step: 2,
                    assessment: questionsAndAnswers,
                    coverLetter: [],
                });
            }
        },

        // For Cover Letter
        setCoverLetterData: (state, action) => {
            const { coverLetterText, jobId, jobDetails } = action.payload;
            const existingJb = state.inCompleteJobs.find((job) => job.jobId === jobId);
            if (existingJb) {
                console.log('agei ase')
                existingJb.coverLetter = coverLetterText;
                existingJb.step = 3;
            } else {
                console.log('dukce')
                state.inCompleteJobs.push({
                    jobId: jobId,
                    jobDetails: jobDetails,
                    step: 3,
                    coverLetter: coverLetterText,
                });
            }
        },

        setStepData: (state, action) => {
            const { step, jobId } = action.payload;
            const existingJob = state.inCompleteJobs.find((job) => job.jobId === jobId);
            if (existingJob) {
                existingJob.step = step;
            }
        },
        removeIncompleteJobs: (state, action) => {
            const existingJob = state.inCompleteJobs.filter((job) => job.jobId !== action.payload);
            state.inCompleteJobs = existingJob
        }
    },
});

export const {
    setAssessmentData,
    setCoverLetterData,
    setUploadedResumeName,
    setCurrentStep,
    setStepData,
    setJobApplyModalOpen,
    removeIncompleteJobs
} = jobApplySlice.actions;

export default jobApplySlice.reducer;
