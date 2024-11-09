/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEditOrganizationMutation } from "../../../feature/profile/profileApiSlice";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useSelector } from "react-redux";

export default function EditProfessionalFrom({ singleProfession, setEditProfession }) {

    const { register, handleSubmit, reset } = useForm();
    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);
    const { _id, organization, designation, jobType, startDate, endDate, details } = singleProfession || {};
    const [editOrganization] = useEditOrganizationMutation();
    const { theme } = useSelector(state => state.theme);
    const handleEditOrganization = async (data) => {
        const editData = {
            ...data,
            endDate: isCurrentlyWorking ? "" : data.endDate
        }
        const res = await editOrganization({ id: _id, data: editData });
        if (res?.data) {
            toast.success("Edit Organization Successfully");
            setEditProfession(false);
            reset();
        }
    }

    return (
        <div>
            <div>
                <h1 className={`text-center font-medium  ${theme ? "text-sky-500" : "text-sky-700"}`}>
                    Edit Organizations Information
                </h1>
                <div>
                    <div className=" h-[1px] w-3/5  mx-auto  bg-sky-600  mb-8"></div>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleEditOrganization)}>
                <div className="w-full xl:flex lg:row gap-4 mt-5">
                    <div className="w-full mb-5 xl:mb-0">
                        <label
                            htmlFor="organization"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Your Organization Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Organization Name . . ."
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("organization")}
                            defaultValue={organization}
                            required
                        />
                    </div>
                    <div className=" w-full">
                        <label
                            htmlFor="interest"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Your Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Designation "
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("designation")}
                            defaultValue={designation}
                            required
                        />
                    </div>
                </div>
                <div className="w-full xl:flex lg:row gap-4 mt-5">
                    <div className=" w-full mb-5 xl:mb-0">
                        <label
                            htmlFor="interest"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Job type <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("jobType")}
                            defaultValue={jobType}
                            required
                        >
                            <option className=" bg-neutral" value="">Job Type *</option>
                            <option className=" bg-neutral">full-time</option>
                            <option className=" bg-neutral">part-time</option>
                            <option className=" bg-neutral">contract</option>
                            <option className=" bg-neutral">freelance</option>
                            <option className=" bg-neutral">internship</option>
                            <option className=" bg-neutral">other</option>
                        </select>
                    </div>

                    <div className=" w-full">
                        <label
                            htmlFor="work_start_time"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Work start time<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="work_start_time"
                            type="text"
                            onFocus={(e) => (e.target.type = "date")}
                            placeholder="work start time . . ."
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("startDate")}
                            defaultValue={moment(startDate).format("MM/DD/YYYY")}
                            required
                        />
                    </div>
                </div>
                <div className="w-full xl:flex items-start lg:row gap-4 mt-5">
                    <div className="flex items-center mt-5 w-full mb-5 xl:mb-0">
                        <input
                            id="checkboxwork"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600  border-warning rounded cursor-pointer bg-base-100"
                            {...register("isWorking")}
                            checked={isCurrentlyWorking}
                            onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
                        />
                        <label
                            htmlFor="checkboxwork"
                            className="ml-2 text-xs text-primary"
                        >
                            I am currently Working this field.
                        </label>
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out h-[4rem] ${isCurrentlyWorking ? "opacity-0 invisible w-0" : "w-full visible opacity-100"}`}>
                        <label
                            htmlFor="work_end_time"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Work end time <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="work_end_time"
                            type="text"
                            onFocus={(e) => (e.target.type = "date")}
                            placeholder="work end time . . ."
                            className={`p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100`}
                            {...register("endDate")}
                            disabled={endDate}
                            required={!isCurrentlyWorking}
                            defaultValue={endDate && moment(endDate).format("MM/DD/YYYY")}
                        />
                    </div>
                </div>

                <div className="w-full xl:flex lg:row gap-4 mt-5">
                    <div className=" w-full">
                        <label
                            htmlFor="working_details"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Job Details <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="working_details"
                            placeholder="Enter working details  . . ."
                            className="input input-bordered input-info p-2.5 border rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs h-32 bg-base-100"
                            {...register("details")}
                            defaultValue={details}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className=" flex items-center justify-center">
                    <input
                        type='submit'
                        className="p-2 bg-sky-400 text-white border border-warning hover:bg-transparent hover:text-sky-400  mt-5 mb-3 text-xs px-4 rounded cursor-pointer"
                        value="Save"
                    />
                </div>
            </form>
        </div>
    )
}
