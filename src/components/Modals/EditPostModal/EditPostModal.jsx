/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";

// icons
import { RxCross1 } from "react-icons/rx";

// components
import EditPostModalFooter from "./EditPostModalFooter";
import EditPostModalHeader from "./EditPostModalHeader";
import TextEditorModules from "../../../Utils/TextEditorModule";

export default function EditPostModal({ modalData }) {
    // get the post data
    const { value, setValue, handlePostEdit, closeEditModal, _id, setPostAccessibility } = modalData

    return (
        <div>
            <div
                onClick={handlePostEdit}
                className={` h-screen fixed w-screen top-0 left-0  bg-[#080808] bg-opacity-80 z-[1000000] flex items-center justify-center  `}
            >
                <div
                    className="add-post-editor lg:w-1/2 sm:w-[35rem]   w-11/12  mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl   p-10 pb-8 relative  "
                    onClick={(e) => e.stopPropagation()}
                >
                    <EditPostModalHeader setPostAccessibility={setPostAccessibility} />

                    <div className="2xl:h-[22rem]  h-[18rem] ForRes ">
                        <ReactQuill
                            modules={TextEditorModules}
                            value={value}
                            onChange={setValue}
                            preserveWhitespace={true}
                            className=" h-full"
                        />
                    </div>

                    <EditPostModalFooter handlePostEdit={handlePostEdit} _id={_id} />
                    <RxCross1 onClick={closeEditModal} className=" absolute right-3 top-3 cursor-pointer hover:text-red-500 "
                    />
                </div>

            </div>
        </div>
    )
}
