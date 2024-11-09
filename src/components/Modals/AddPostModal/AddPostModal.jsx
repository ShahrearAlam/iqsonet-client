/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TextEditorModules from "../../../Utils/TextEditorModule";
import { setModalPost } from "../../../feature/modal/modalSlice";

// Import css
import "../../../assets/styles/add-post.css";

// React Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Component
import AddPostHeader from "./AddPostHeader";
import AddPostFooter from "./AddPostFooter";

// Icons Import
import { RxCross1 } from "react-icons/rx";


const AddPost = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [postAccessibility, setPostAccessibility] = useState("public");
  const { theme } = useSelector(state => state.theme)

  const closeModal = () => {
    dispatch(setModalPost(false));
  };

  const editorClassName = !theme ? 'ql-editor dark' : 'ql-editor';

  return (
    <div
      onClick={closeModal}
      className={`h-screen fixed w-screen top-0 left-0 bg-black bg-opacity-80 z-[1000000] flex items-center justify-center`}
    >
      <div
        className="add-post-editor lg:w-1/2 sm:w-[35rem]   w-11/12  mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl p-10 pb-8 relative  "
        onClick={(e) => e.stopPropagation()}
      >

        <AddPostHeader setPostAccessibility={setPostAccessibility} />
        <div className="2xl:h-[23rem] h-[20rem] ForRes ">
          <ReactQuill
            modules={TextEditorModules}
            value={value}
            onChange={setValue}
            placeholder="Write your thinking...."
            className={`${editorClassName} `}
          />
        </div>
        <AddPostFooter value={value} postAccessibility={postAccessibility} />

        <RxCross1
          onClick={closeModal}
          className=" absolute right-5 top-5 cursor-pointer hover:text-red-500 "
        />
      </div>
    </div>
  );
};

export default AddPost;
