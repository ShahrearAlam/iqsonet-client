/* eslint-disable react/prop-types */
import { RxCross1 } from 'react-icons/rx'

export default function AddNoticeModal({ closeAddNoticeModal }) {
    return (
        <div
            onClick={closeAddNoticeModal}
            className={` h-screen fixed w-screen top-0 left-0  bg-[#080808cf] bg-opacity-80 z-[1000000] flex items-center justify-center  `}
        >
            <div
                className="add-post-editor sm:w-1/2 w-full mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl p-10 pb-8 relative "
                onClick={(e) => e.stopPropagation()}
            >
                <div className=' flex-1'>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-primary ">Add notice</label>
                        <input type="email" id="email" className="bg-base-100 border border-warning text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Add notice here . . ." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-primary ">Notice Url (optional)</label>
                        <input type="email" id="email" className="bg-base-100 border border-warning text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Notice Url here . . ." required />
                    </div>
                </div>
                <RxCross1 onClick={closeAddNoticeModal} className=" absolute right-3 top-3 cursor-pointer hover:text-red-500 "
                />
            </div>

        </div>
    )
}
