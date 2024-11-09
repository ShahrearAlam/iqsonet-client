import { MdDynamicFeed } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { TbEPassport } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import { activeBtn, sideNavBtn } from "../../utils/tailwindClasses";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalPost } from "../../feature/modal/modalSlice";

// eslint-disable-next-line react/prop-types
const SideNav = () => {
  const location = useLocation();
  const url = location?.pathname?.split("/")[1];
  const { theme } = useSelector(state => state.theme);

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex flex-col gap-1 mt-8 lg:px-10 text-primary text-xs">
        <Link
          to="/"
          className={`${sideNavBtn} ${url === "" ? theme === true ? "bg-[#323232] text-blue-500 hover:bg-[#d0ecff]" : activeBtn : undefined} `}
        >
          <MdDynamicFeed className=" text-xl " />
          <span className="lg:text-sm text-xs">Timeline</span>
        </Link>
        {/* <Link
          to="/profile"
          className={`${sideNavBtn} ${url === "profile" ? theme === true ? "bg-[#323232] text-blue-500 hover:bg-[#d0ecff]" : activeBtn : undefined
            }`}
        >
          <FaRegCircleUser className=" text-xl " />
          <span className="lg:text-sm text-xs">Profile</span>
        </Link> */}
        <Link
          to="/my-network"
          className={`${sideNavBtn} ${url === "my-network" ? theme === true ? "bg-[#323232] text-blue-500 hover:bg-[#d0ecff]" : activeBtn : undefined
            }`}
        >
          <HiOutlineUserAdd className=" text-xl " />
          <span className="lg:text-sm text-xs">My Network</span>
        </Link>
        <Link
          to="/community"
          className={`${sideNavBtn} ${url === "community" ? theme === true ? "bg-[#323232] text-blue-500 hover:bg-[#d0ecff]" : activeBtn : undefined
            }`}
        >
          <HiMiniUserGroup className=" text-xl " />
          <span className="lg:text-sm text-xs">Community</span>
        </Link>
        <Link
          to="/job-portal"
          className={`${sideNavBtn} ${url === "job-portal" ? theme === true ? "bg-[#323232] text-blue-500 hover:bg-[#d0ecff]" : activeBtn : undefined
            }`}
        >
          <TbEPassport className=" text-xl " />
          <span className="lg:text-sm text-xs">Job Portal</span>
        </Link>

        <button
          onClick={() => dispatch(setModalPost(true))}
          className={`mt-4 lg:text-blue-500 hover:bg-blue-500 hover:text-white flex justify-center lg:px-4 px-1 py-2.5 rounded-lg border border-blue-500 transition duration-300`}
        >
          <BsPencilSquare className="lg:hidden" />
          <button
            onClick={() => dispatch(setModalPost(true))}
            className="lg:block md:hidden text-[14px]"
          >
            Create Post +
          </button>
        </button>
        <h2 className="mt-5">Your Groups</h2>
      </div>
    </div>
  );
};

export default SideNav;