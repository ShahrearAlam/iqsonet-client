/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAddOrganizationMutation } from "../../../feature/profile/profileApiSlice";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Button from "../../Sheard/Button";

export default function AddProfessionFrom({ setAddProfession }) {

    const { register, handleSubmit, reset } = useForm();
    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);
    const [addOrganization] = useAddOrganizationMutation();
    const { theme } = useSelector(state => state.theme);

    const handleAddOrganization = async (data) => {
        const newOrganization = {
            ...data,
            endDate: isCurrentlyWorking ? "" : data.endDate
        }
        const res = await addOrganization(newOrganization);
        if (res?.data) {
            toast.success("Add New Organization");
            setAddProfession(false);
            reset();
        }
    }

    return (
        <div>
            <div>
                <h1 className={`text-center font-medium  ${theme ? "text-sky-500" : "text-sky-700"}`}>
                    Add Organizations Information
                </h1>
                <div>
                    <div className=" h-[1px] w-3/5  mx-auto  bg-sky-600  mb-8"></div>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleAddOrganization)}>
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
                            required
                        />
                    </div>
                </div>
                <div className="w-full xl:flex items-start lg:row gap-4 mt-5">
                    <div className="flex items-center mt-5 w-full mb-5 xl:mb-0">
                        <input
                            id="checkboxwork"
                            type="checkbox"
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
                        className={`transition-all duration-300 ease-in-out h-[4rem] ${isCurrentlyWorking ?
                            "opacity-0 invisible w-0" :
                            "w-full visible opacity-100"}`}>
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
                            className={`p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100 text-primary`}
                            {...register("endDate")}
                            disabled={isCurrentlyWorking}
                            required={!isCurrentlyWorking}
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
                            className="input input-bordered input-info p-2.5 border rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs h-32"
                            {...register("details")}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className=" flex items-center justify-center">
                    <Button type="submit" text='Add Now' color='bg-[#0792f2]' border='border-[#0792f2]' hover="hover:text-[#0792f2]  hover:bg-transparent" />
                </div>
            </form>
        </div>
    )
}
