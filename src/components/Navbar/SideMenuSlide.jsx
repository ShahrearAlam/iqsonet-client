/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { MdDynamicFeed } from 'react-icons/md'
import { FaRegCircleUser } from 'react-icons/fa6'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { activeBtn, slideNavBtn } from '../../utils/tailwindClasses'
import '../../assets/styles/slidemenu.css'
import { useSelector } from 'react-redux'
import { TbEPassport } from 'react-icons/tb'

const SideMenuSlide = ({ sideMenuSlide, setSideMenuSlide }) => {
  const url = location?.pathname?.split("/")[1];
  const { theme } = useSelector(state => state.theme);
  return (
    <div onClick={() => setSideMenuSlide(false)} className={`bg-[#000] fixed top-0  h-screen w-full z-[555] bg-opacity-20 ${sideMenuSlide ? 'block' : 'hidden'}`}>
      <div onClick={(e) => e.stopPropagation()} className={`slidemenu top-0 z-50 h-[100vh] bg-base-100 w-[40%] py-6 px-2 md:hidden  ${sideMenuSlide ? 'open' : 'close'}`}>
        <h1 className=' text-md font-medium text-center pr-4'>IQnet</h1>
        <div className=" text-white bg-red-500 rounded-full h-6 w-6 flex items-center justify-center absolute right-4 top-2 " onClick={() => setSideMenuSlide(false)}>✕</div>
        <div className='flex flex-col gap-2 mt-8 text-primary'>
          <Link
            to="/"
            className={`${slideNavBtn} ${url === "" ? theme === true ? "bg-[#323232] text-sky-500 hover:bg-[#d0ecff]" : activeBtn : undefined} `}
          >
            <MdDynamicFeed className=" text-xl " />
            <span className="lg:text-base text-xs">Feed</span>
          </Link>

          <Link
            to="/profile"
            className={`${slideNavBtn} ${url === "profile" ? theme === true ? "bg-[#323232] text-sky-500 hover:bg-[#d0ecff]" : activeBtn : undefined
              }`}
          >
            <FaRegCircleUser className=" text-xl " />
            <span className="lg:text-base text-xs">Profile</span>
          </Link>
          <Link
            to="/my-network"
            className={`${slideNavBtn} ${url === "my-network" ? theme === true ? "bg-[#323232] text-sky-500 hover:bg-[#d0ecff]" : activeBtn : undefined
              }`}
          >
            <HiOutlineUserAdd className=" text-xl " />
            <span className="lg:text-base text-xs">My Network</span>
          </Link>
          <Link
            to="/community"
            className={`${slideNavBtn} ${url === "community" ? theme === true ? "bg-[#323232] text-sky-500 hover:bg-[#d0ecff]" : activeBtn : undefined
              }`}
          >
            <HiMiniUserGroup className=" text-xl " />
            <span className="lg:text-base text-xs">Community</span>
          </Link>
          <Link
            to="/job-portal"
            className={`${slideNavBtn} ${url === "job-portal" ? theme === true ? "bg-[#323232] text-sky-500 hover:bg-[#d0ecff]" : activeBtn : undefined
              }`}
          >
            <TbEPassport className=" text-xl " />
            <span className="lg:text-base text-xs">Job Portal</span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default SideMenuSlide
