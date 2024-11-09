/* eslint-disable react/prop-types */
import { useState } from "react";

// Icons Import
import { BsTags } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { TbDots } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";

// Button
import Button from "../../Sheard/Button";


export default function EditPostModalFooter({ handlePostEdit, _id }) {

    // Dummy data
    const moodOptions = [
        { label: "😃 Happy", value: "happy" },
        { label: "😔 Sad", value: "sad" },
        { label: "😎 Cool", value: "cool" },
    ];

    // for acitivity
    const [acivity, setAcitivy] = useState(false);

    return (
        <div className=" mb-3 px-1 flex items-center justify-between mt-3  gap-4 w-full ">
            <div className="flex items-center gap-3">
                <div className=" relative">
                    {/* Post location, photo, tag button */}
                    <button
                        onClick={() => setAcitivy(!acivity)}
                        className=" bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded mt-1"
                    >
                        <TbDots />
                    </button>

                    {/* For adding mood */}
                    <div
                        className={`absolute bottom-[3.2rem]  bg-green-900 bg-opacity-60 backdrop-blur-sm shadow border border-blue-100 p-5  transition-all duration-300 ease-in-out rounded-xl xl:w-[25vw] sm:w-[35vw] w-[60vw] ${acivity
                            ? "opacity-100 visible left-0"
                            : " opacity-0 invisible -left-1"
                            }`}
                    >
                        <input
                            type="text"
                            placeholder="This is the serach"
                            className=" bg-transparent p-2 text-xs  border border-white rounded w-full placeholder:text-white"
                        />
                        <div className=" mt-6 lg:flex items-center gap-4">
                            <div className=" lg:w-1/2 w-full">
                                <div className=" w-full">
                                    <div className="flex items-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex text-xs items-center  w-full  border-white border rounded cursor-pointer bg-blue-50  hover:bg-gray-100 py-2 px-2 "
                                        >
                                            <p className="text-xs text-gray-600 flex items-center gap-2">
                                                <FiCamera />
                                                Photo/Video
                                            </p>

                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className=" mt-4">
                                    <button className=" w-full py-2  bg-blue-50 border border-white  px-2.5 flex items-center gap-2 text-xs rounded">
                                        <BsTags /> Tag Friends
                                    </button>
                                </div>
                            </div>
                            <div className=" lg:w-1/2 w-full mt-4 lg:mt-0">
                                <div>
                                    <button className=" w-full py-2  bg-blue-50 border border-white  px-2.5 flex items-center gap-2 text-xs rounded">
                                        <MdOutlineLocationOn /> Post Location
                                    </button>
                                </div>
                                <div className=" mt-3">
                                    <select
                                        className="w-full py-[7px]  border border-white rounded text-xs bg-blue-50 px-2 focus:outline-none"
                                    >
                                        <option value="" className=" text-xs">
                                            😃 Select mood
                                        </option>
                                        {moodOptions.map((mood) => (
                                            <option
                                                className=" text-xs"
                                                key={mood.value}
                                                value={mood.value}
                                            >
                                                {mood.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add mood */}
                <div>
                    <select className="px-3 py-2 border rounded text-xs bg-base-100">
                        <option value="" className=" text-xs">
                            Select mood
                        </option>
                        {moodOptions.map((mood) => (
                            <option className=" text-xs" key={mood.value} value={mood.value}>
                                {mood.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='text-center'>
                <Button type="button" text='Submit' color='bg-[#0792f2]' border='border-[#0792f2]' hover="hover:text-[#0792f2] hover:bg-transparent" onClick={() => handlePostEdit(_id)} />

            </div>
        </div>
    )
}
