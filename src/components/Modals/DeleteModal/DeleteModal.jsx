/* eslint-disable react/prop-types */
import { RxCross1, RxCrossCircled } from "react-icons/rx";

export default function DeleteModal({ modalData }) {

    const { deleteModal, setDeleteModal, handleDelete, deleteId } = modalData;

    return (
        <div
            onClick={() => setDeleteModal(false)}
            className={`  fixed w-screen  left-0  bg-opacity-80 z-[1000000] flex items-start pt-10 justify-center  ${deleteModal ? "h-screen top-0 bg-black " : "h-0 -top-52 bg-white"}  `}
        >
            <div
                className={
                    `
                    add-post-editor w-80 mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl   p-10 px-7 relative   text-center transition-all ease-in-out duration-500 ${deleteModal ? "top-32" : " -top-80"}
                  `
                }
                onClick={(e) => e.stopPropagation()}
            >
                <RxCrossCircled className=" text-5xl mx-auto text-red-400" />
                <h1 className=" my-2">Are you Sure?</h1>
                <p className=" text-xs text-gray-600">Do your really want to delete these records? This process cannot be undone.</p>


                <div className=" flex items-center gap-5 justify-center mt-6">
                    <button onClick={() => setDeleteModal(false)} className=" text-sm px-4 py-1.5 bg-gray-400 rounded font-medium border border-gray-400 hover:bg-transparent hover:text-gray-400 text-white ">Cancel</button>
                    <button onClick={() => handleDelete(deleteId)} className=" text-sm px-4 py-1.5 bg-red-400 rounded font-medium border border-red-400 hover:bg-transparent hover:text-red-400 text-white  ">Delete</button>
                </div>


                <RxCross1
                    onClick={() => setDeleteModal(false)}
                    className=" absolute right-5 top-5 cursor-pointer hover:text-red-500 text-xs "
                />
            </div>
        </div>

    )
}
