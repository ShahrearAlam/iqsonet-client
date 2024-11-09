/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { useEditEducationMutation } from '../../../feature/profile/profileApiSlice';

import { useSelector } from 'react-redux';
import Button from '../../Sheard/Button';

export default function EditEducationFrom({ singleEducation, setEditEducation }) {

    const { register, handleSubmit, reset } = useForm();
    const { _id, institute, department, concentration, startDate, endDate, details } = singleEducation || {};
    const [isCurrentlyEducating, setIsCurrentlyEducating] = useState("");
    const [editEducation] = useEditEducationMutation();
    const { theme } = useSelector(state => state.theme);
    useEffect(() => {
        setIsCurrentlyEducating(!singleEducation?.isGraduated);
    }, [singleEducation])

    const handleEditEducation = async (data) => {
        const editData = {
            ...data,
            isGraduated: isCurrentlyEducating ? false : true,
            endDate: isCurrentlyEducating ? "" : data.endDate
        }
        const res = await editEducation({ id: _id, data: editData });
        if (res?.data) {
            toast.success("Edit Education Successfully");
            setEditEducation(false);
            reset();
        }
    }

    return (isCurrentlyEducating !== "" &&
        <div>
            <div>
                <h1 className={`text-center font-medium  ${theme ? "text-sky-500" : "text-sky-700"}`}>
                    Edit Educations Information
                </h1>
                <div>
                    <div className=" h-[1px] w-3/5  mx-auto  bg-sky-600  mb-8"></div>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleEditEducation)}>
                <div className="w-full xl:flex lg:row gap-4 mt-5">
                    <div className=" w-full mb-5 xl:mb-0">
                        <label
                            htmlFor="institute_name"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Institute Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="institute_name"
                            type="text"
                            placeholder="Your Institute Name . . ."
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("institute")}
                            defaultValue={institute}
                            required
                        />
                    </div>

                    <div className=" w-full">
                        <label
                            htmlFor="department"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Department Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="department"
                            type="text"
                            placeholder="Enter Department Name . . ."
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("department")}
                            defaultValue={department}
                            required
                        />
                    </div>
                </div>
                <div className="w-full xl:flex lg:row gap-4 mt-5">
                    <div className=" w-full mb-5 xl:mb-0">
                        <label
                            htmlFor="concentration"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Concentration <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="concentration"
                            type="text"
                            placeholder="Concentration . . . "
                            className="p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                            {...register("concentration")}
                            defaultValue={concentration}
                            required
                        />
                    </div>
                    <div className=" w-full">
                        <label
                            htmlFor="startTime"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Start Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="startTime"
                            type="text"
                            onFocus={(e) => (e.target.type = "date")}
                            placeholder="Enter Start Time . . ."
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
                            id="link-checkbox"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-base-100 border-warning rounded cursor-pointer"
                            {...register("isGraduated")}
                            checked={isCurrentlyEducating}
                            onChange={() => setIsCurrentlyEducating(!isCurrentlyEducating)}
                        />
                        <label
                            htmlFor="link-checkbox"
                            className="ml-2 text-xs text-primary"
                        >
                            I am currently educating this field.
                        </label>
                    </div>
                    <div
                        className={`  transition-all duration-300 ease-in-out h-[4rem] ${isCurrentlyEducating
                            ? "opacity-0 invisible w-0"
                            : " w-full visible opacity-100"
                            }`}
                    >
                        <label
                            htmlFor="interest"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Education Ending Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={(e) => (e.target.type = "date")}
                            placeholder="End Time *"
                            className={`p-2.5 border border-warning rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100`}
                            {...register("endDate")}
                            required={!isCurrentlyEducating}
                            defaultValue={endDate && moment(endDate).format("MM/DD/YYYY")}
                        />
                    </div>
                </div>

                <div className="w-full xl:flex lg:row gap-4 mt-5">
                    <div className=" w-full mb-5 xl:mb-0">
                        <label
                            htmlFor="interest"
                            className="block mb-1 text-[13px] text-primary"
                        >
                            Your Interest Field <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Details *"
                            className="input input-bordered input-info p-2.5 border rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100 h-32"
                            {...register("details")}
                            defaultValue={details}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className=" flex items-center justify-center">
                    <Button type="submit" text='Save' color='bg-[#0792f2]' border='border-[#0792f2]' hover="hover:text-[#0792f2]  hover:bg-transparent" />
                </div>
            </form>
        </div>
    )
}
