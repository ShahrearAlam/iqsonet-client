/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function PostShareModal({ modalData }) {

  const { shareModal, setShareModal, handleShare, postId } = modalData;

  return (
    <div onClick={() => setShareModal(false)}
      className={`  fixed w-screen  left-0  bg-opacity-80 z-[1000000] flex items-start pt-10 justify-center  ${shareModal ? "h-screen top-0 bg-black " : "h-0 -top-52 bg-white"}  `}>
      <div className={`add-post-editor w-80 mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl   p-10 px-7 relative   text-center transition-all ease-in-out duration-500 ${shareModal ? "top-32" : " -top-80"}`}
        onClick={(e) => e.stopPropagation()}>
        <FaRegShareFromSquare className=" text-5xl mx-auto text-sky-400" />
        <h1 className=" my-2">Confirm Post Sharing</h1>
        <p className=" text-xs text-gray-600">Are you sure you want to share this post on your account?</p>

        <div className=" flex items-center gap-5 justify-center mt-6">
          <button onClick={() => setShareModal(false)} className=" text-sm px-4 py-1.5 bg-gray-400 rounded font-medium border border-gray-400 hover:bg-transparent hover:text-gray-400 text-white ">Cancel</button>
          <button onClick={() => handleShare(postId)} className=" text-sm px-4 py-1.5 bg-sky-400 rounded font-medium border border-sky-400 hover:bg-transparent hover:text-sky-400 text-white  ">Share</button>
        </div>

        <RxCross1 onClick={() => setShareModal(false)}
          className="absolute right-5 top-5 cursor-pointer hover:text-red-500 text-xs" />
      </div>
    </div>

  )
}
