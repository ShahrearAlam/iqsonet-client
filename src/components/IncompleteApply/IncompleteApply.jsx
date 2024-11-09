/* eslint-disable react/prop-types */
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

// Dummy Data 
// import JobsData from "../../assets/json/JobsData.json"

// icons
import { MdOutlineLocationOn } from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import { setJobApplyModalOpen } from '../../feature/jobApply/jobApplySlice';

export default function IncompleteApply({ setInApplyOpen, inApplyOpen }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { theme } = useSelector(state => state.theme);
    const jobData = useSelector((state) => state.jobApply.inCompleteJobs);

    console.log(jobData)


    const handleApplyClick = ({ Id }) => {
        dispatch(setJobApplyModalOpen(true))
        navigate(`/job-details/${Id}`)
    }

    return (
        <div onClick={() => setInApplyOpen(false)} className={`fixed top-0 left-0 w-screen h-screen z-10 bg-gray-500 bg-opacity-5  transition-all ease-linear duration-200 ${inApplyOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`h-screen sm:w-[28rem] bg-base-100 absolute  top-0 z-20 p-5 transition-all ease-linear duration-200 overflow-y-auto notification ${inApplyOpen ? "right-0" : "-right-[28rem]"} `}>
                {/* Header  */}
                <div>
                    <div className=" flex items-center justify-between">
                        <h2 className="text-primary font-medium text-[17px]">Incomplete Apply</h2>
                        <RxCross1
                            onClick={() => setInApplyOpen(false)}
                            className=" cursor-pointer hover:text-red-500 "
                        />
                    </div>
                    <hr className={`my-3 ${theme ? 'border-gray-700' : 'border-gray-300'}`} />

                    {/* List of incomplete jobs */}
                    {jobData?.length > 0 ? (
                        <div>
                            {jobData.map((job) => (
                                <div className=' bg-gray-100 p-3 rounded-md mb-5' key={job.jobId}>
                                    <p className=' font-medium text-black'>{job?.jobDetails?.title}</p>
                                    <p> {job?.jobDetails?.organization.name}</p>

                                    <div className=' flex justify-between items-center'>
                                        <p className=' text-[14px] flex items-center gap-2'><MdOutlineLocationOn />{job?.jobDetails?.location}</p>
                                        <button onClick={() => handleApplyClick({ Id: job?.jobId })} type='button' className=' mt-4 px-3 py-1.5 bg-green-600 text-[12px] font-medium rounded text-white'>Continue Apply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">You dont have any incomplete job applications.</p>
                    )}
                </div>
            </div>
        </div>

    )
}
