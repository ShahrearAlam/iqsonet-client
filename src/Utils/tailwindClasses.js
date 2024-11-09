import classNames from "classnames";


export const sideNavBtn = classNames('hover:bg-neutral  flex flex-col lg:flex-row items-center justify-center lg:justify-normal lg:px-4 px-1 lg:py-3 py-2  gap-2 rounded-md ')

export const activeBtn = classNames('bg-sky-100 text-sky-500 hover:bg-[#d0ecff]')

export const slideNavBtn = classNames(' normal-case font-normal  hover:bg-neutral flex items-center justify-start gap-2 px-4 py-3')


export const editProfileSubmitBtn = classNames('px-6 flex items-center py-1.5 bg-green-500 text-xs text-white  rounded-sm border border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-150 ease-in-out')
export const editProfileNextBtn = classNames('px-6 flex items-center py-1.5 bg-emerald-500  text-xs text-white  rounded-sm border border-emerald-500 hover:bg-transparent hover:text-emerald-500 transition-all duration-150 ease-in-out')
export const editProfilePreviousBtn = classNames('px-6 flex items-center py-1.5 bg-blue-500 text-xs text-white  rounded-sm border border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-150 ease-in-out ')
export const actionBtn = classNames('px-4 py-2.5 rounded-md bg-emerald-500 hover:bg-transparent border border-2 border-emerald-500 text-white hover:text-emerald-500 text-sm transition duration-300')



// See more button
export const seeMore = classNames('flex items-center gap-1 text-xs text-sky-500 hover:text-sky-700')

// Admin
export const adminSideNavLink = classNames('flex items-center gap-3 text-sm font-medium tracking-wide text-[#637381] hover:text-[#637381] hover:bg-[#f6f7f8] focus:!bg-[#00A76F14] focus:!text-[#00A76F] py-3 mb-1')

// Notification
export const notificationIcon = classNames('text-primary mt-0.5')