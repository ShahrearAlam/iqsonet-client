/* eslint-disable react/prop-types */
import { RxCross1 } from 'react-icons/rx'

// Image Import
import demoProfile from '../../../assets/images/profile2.png'

export default function CommunityEditModal({ closeCommunityEditModal }) {
    return (
        <div
            onClick={closeCommunityEditModal}
            className={` h-screen fixed w-screen top-0 left-0  bg-[#080808cf] bg-opacity-80 z-[1000000] flex items-center justify-center  `}
        >
            <div
                className="add-post-editor sm:w-1/2 w-full mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl p-10 pb-8 relative "
                onClick={(e) => e.stopPropagation()}
            >

                <div className='flex gap-10 items-center'>
                    <div className=' flex flex-col items-center w-fit gap-3'>
                        <div className=' h-40 w-40 rounded-full bg-gray-600'>
                            <img className='w-full h-full rounded-full' src={demoProfile} alt="" />
                        </div>

                        <label htmlFor="dropzone-file" className="flex items-center justify-start  py-1.5 border border-sky-500 bg-sky-500 w-fit px-3 rounded-lg cursor-pointer text-white">
                            <p className="  flex items-center gap-1.5 font-medium text-xs ">Upload photo</p>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>

                    </div>

                    <div className=' flex-1'>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-primary ">Community Name</label>
                            <input type="email" id="email" className="bg-base-100 border border-warning text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Community Name . . ." required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-primary ">Community Title</label>
                            <input type="email" id="email" className="bg-base-100 border border-warning text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Community Title . . ." required />
                        </div>
                    </div>
                </div>

                <div className=' h-52 border border-warning rounded-xl overflow-hidden mt-8 relative'>
                    <img src="https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg" alt="" />

                    <label htmlFor="dropzone-file" className="flex items-center justify-start  py-1.5 border border-white  bg-white w-fit px-3 rounded-lg cursor-pointer text-black absolute right-4 bottom-2">
                        <p className="  flex items-center gap-1.5 font-medium text-xs ">Upload photo</p>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>

                <RxCross1 onClick={closeCommunityEditModal} className=" absolute right-3 top-3 cursor-pointer hover:text-red-500 "
                />
            </div>

        </div>
    )
}
