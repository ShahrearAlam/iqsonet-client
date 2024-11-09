/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import EditEducationFrom from "./EditEducationFrom";
import { useSelector } from "react-redux";



export default function EditEducationModal({ setEditEducation, editId }) {

    const { profileData } = useSelector(state => state.profile);
    const { education } = profileData || {};
    const singleEducation = education.find((edu) => edu._id === editId)

    return (

        <div
            onClick={() => setEditEducation(false)}
            className={` h-screen fixed w-screen top-0 left-0  bg-black bg-opacity-80 z-[1000000] flex items-center justify-center  `}
        >
            <div
                className="add-post-editor sm:w-1/2 w-full mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl   p-10 pb-8 relative   h-[80vh]  scrollbox  overflow-y-scroll overflow-x-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {singleEducation && <EditEducationFrom singleEducation={singleEducation} setEditEducation={setEditEducation} />}

                <RxCross1
                    onClick={() => setEditEducation(false)}
                    className=" absolute right-5 top-5 cursor-pointer hover:text-red-500 "
                />
            </div>
        </div>

    )
}
