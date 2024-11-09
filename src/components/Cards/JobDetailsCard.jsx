/* eslint-disable react/prop-types */
import JobDecription from "../../pages/JobPortal/JobDetails/JobDecription";
import JobInfo from "../../pages/JobPortal/JobDetails/JobInfo";


export default function JobDetailsCard({ data, hiring }) {
    return (
        <div className=" xl:flex gap-7">
            <div className=" xl:w-2/3">
                <JobDecription data={data} hiring={hiring} />
            </div>
            <JobInfo data={data} />
        </div>
    )
}
