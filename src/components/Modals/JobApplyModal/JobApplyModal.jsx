/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";

// icons
import { RxCross1 } from "react-icons/rx";

// Component
import Assessment from "../../../pages/JobPortal/JobApply/Assessment/Assessment";
import CoverLetter from "../../../pages/JobPortal/JobApply/Coverleter/CoverLetter";
import ApplyResume from "../../../pages/JobPortal/JobApply/ApplyResume/ApplyResume";
import HorizontalProgressBar from "../../../pages/Profile/UpdateProfile/HorizontalProgressBar";
import { setCurrentStep, setJobApplyModalOpen } from "../../../feature/jobApply/jobApplySlice";
import { useParams } from "react-router-dom";
import { useGetSingleJobPostQuery } from "../../../feature/jobPost/jobPostApiSlice";


export default function JobApplyModal() {


    const { id } = useParams();
    const jobId = id;
    const { data: jobData } = useGetSingleJobPostQuery(jobId);
    const singleJobdata = jobData?.data

    const exitsAnswers = useSelector((state) => state.jobApply.inCompleteJobs);
    const Step = useSelector((state) => state.jobApply.currentStep);
    const addedAnswers = exitsAnswers.find(data => data.jobId === jobId)

    console.log(Step)
    // For step 
    const currentStep = singleJobdata?.questions.length > 0 ? addedAnswers?.step ? addedAnswers?.step : Step : Step
    const totalSteps = singleJobdata?.questions.length > 0 ? 3 : 2;
    const progressStep = 100 / totalSteps;
    const progress = progressStep * currentStep;
    const dispatch = useDispatch();

    // next and previous
    const renderFormStep = () => {
        if (singleJobdata?.questions.length > 0) {
            switch (currentStep) {
                case 1:
                    return <Assessment />;
                case 2:
                    return <CoverLetter />;
                case 3:
                    return <ApplyResume />;
                default:
                    return null;
            }
        } else {
            switch (currentStep) {
                case 1:
                    return <CoverLetter />;
                case 3:
                    return <ApplyResume />;
                default:
                    return null;
            }
        }
    };

    return (
        <div
            onClick={() => dispatch(setJobApplyModalOpen(false))}
            className={` h-screen fixed w-screen top-0 left-0  bg-black bg-opacity-80 z-[1000000] flex items-center justify-center   `}
        >
            <div
                className="add-post-editor sm:w-1/2 w-full mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl   p-8 pb-8 relative   h-[80vh]  scrollbox  overflow-y-scroll overflow-x-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {renderFormStep()}

                {/* handel close modal */}
                <RxCross1
                    onClick={() => {
                        dispatch(setJobApplyModalOpen(false));
                        dispatch(setCurrentStep(1));
                    }}
                    className=" absolute right-5 top-5 cursor-pointer hover:text-red-500 "
                />

                {/* Progress bar */}
                <div className=" absolute top-0 left-0 w-full ">
                    <HorizontalProgressBar progress={progress} />
                </div>
            </div>
        </div>

    )
}
