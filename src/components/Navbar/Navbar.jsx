import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import {
  BsChevronDown,
  BsMoonStars,
  BsSun,
  BsBookmark,
  BsEmojiExpressionless
} from "react-icons/bs";

import SideMenuSlide from "./SideMenuSlide";
import { logout } from "../../feature/auth/authSlice";
import { setTheme } from "../../feature/theme/themeSlice";
import { useSearchSuggestionsQuery } from "../../feature/search/searchApiSlice";
import { useDebounce } from 'use-debounce';
import { useGetNotificationsQuery, useSeenNotificationMutation } from "../../feature/notification/notificationApiSlice";
import { addNewNotification, removeMultipleNotification, removeNotification, resetUnseenNotificationCount, setDrawerOpen, setNotification } from "../../feature/notification/notification.slice";
import { getSocket } from "../../Utils/Socket";
import NotificationDrawer from "../NotificationDrawer/NotificationDrawer";
import PostCard from "../Cards/PostCard";
import { localStorageTheme, setThemeInLocalStorage } from "../../Utils/LocalStorage";
import dummyUser from '../../assets/images/profile2.png'
import profile from "../../assets/images/profile2.png";

const Navbar = () => {
  const { themeMode, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { fullname, profilePicture } = user?.personal || {};
  const [sideMenuSlide, setSideMenuSlide] = useState(false);

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setThemeInLocalStorage("dark");
      dispatch(setTheme({ themeMode: "dark", theme: true }));
    } else {
      setThemeInLocalStorage("light");
      dispatch(setTheme({ themeMode: "light", theme: false }));
    }
  };

  useEffect(() => {
    if (!localStorageTheme()) {
      setThemeInLocalStorage("light");
      dispatch(setTheme({ themeMode: "light", theme: false }));
    }
    if (theme === undefined && localStorageTheme()) {
      dispatch(setTheme({ themeMode: localStorageTheme(), theme: localStorageTheme() === "dark" ? true : false }));
    }
    document.querySelector("html").setAttribute("data-theme", themeMode);
  }, [theme]);

  // Handle log out
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  // For search
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { data } = useSearchSuggestionsQuery({ query: debouncedSearchQuery });
  const searchResults = data?.data?.data;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsDropdownOpen(!!query);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isDropdownOpen) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          event.target !== document.querySelector(".input")
        ) {
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleDocumentClick);
    }
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDropdownOpen]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      e.preventDefault();
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
      setIsDropdownOpen(false);
    }
  };

  // For Notification drawer
  const { unseenNotificationCount } = useSelector((state) => state.notification);
  const { data: notifications, isLoading } = useGetNotificationsQuery(user?._id);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setNotification(notifications?.data));
    }
  }, [dispatch, notifications]);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      // Add new Notification in real time
      socket.on("notification", (data) => {
        dispatch(addNewNotification(data));
      });

      // Remove Notification in real time
      socket.on("removeNotification", (data) => {
        dispatch(removeNotification(data));
      });

      // Remove Multiple Notification in real time
      socket.on("removeMultipleNotification", (data) => {
        dispatch(removeMultipleNotification(data));
      }
      )
    }

    // Clean up the event listeners if necessary
    return () => {
      if (socket) {
        socket.off("notification");
        socket.off("removeNotification");
        socket.off("removeMultipleNotification");
      }
    };
  }, []);

  // Seen Notification api
  const [seenNotification] = useSeenNotificationMutation();

  const handleSeenNotification = async (id) => {
    if (unseenNotificationCount) {
      const res = await seenNotification(id);
      if (res?.data) {
        dispatch(resetUnseenNotificationCount());
      }
    }
  };

  return (
    <>
      <div className="h-16 flex items-center bg-base-100 border border-warning shadow-sm rounded-b-xl">
        <div className="container flex items-center justify-between mx-auto">
          <div className="lg:hidden md:hidden block text-2xl">
            <HiMenuAlt1 onClick={() => setSideMenuSlide(!sideMenuSlide)} />
          </div>
          {sideMenuSlide && (
            <SideMenuSlide
              sideMenuSlide={sideMenuSlide}
              setSideMenuSlide={setSideMenuSlide}
            />
          )}
          <Link to="/" className="text-xl font-bold text-gradient">
            iqsocial
          </Link>
          <div className="relative md:block hidden">
            <form className="relative  ">
              <input
                type="text"
                placeholder="Search on iqnet"
                value={searchQuery}
                onKeyPress={handleKeyPress}
                onChange={handleSearchInputChange}
                onFocus={() => setIsDropdownOpen(true)}
                className="pl-10 input border-warning input-primary xl:min-w-[450px] w-full focus:outline-none focus:border-sky-500"
              />
              <FiSearch className="text-lg absolute top-[50%] translate-y-[-50%] left-4" />
            </form>

            {/* Search result dropdown */}
            {isDropdownOpen && searchQuery.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-[3rem] bg-neutral border border-sky-600 border-t-0  backdrop-blur-lg w-full p-3 rounded-lg max-h-[20rem] overflow-y-auto scrollbox"
              >
                {searchResults?.map((result, index) => {
                  if (result.type === "user") {
                    return (
                      <div key={index} className="my-4">
                        <div className="flex gap-2 justify-between items-center hover:bg-gray-100 shadow py-1 rounded-lg px-1">
                          <div className="flex items-center gap-2">
                            <img
                              src={result?.personal?.profilePicture ? result?.personal?.profilePicture : dummyUser}
                              className="h-10 w-10 object-cover rounded-xl bg-gray-600"
                              alt={result?.personal?.fullname || "User name"}
                            />
                            <div>
                              <span className="block font-meidum text-[14px] text-primary leading-[14px] pt-2">
                                {result?.personal?.fullname || "User name"}
                              </span>
                              <span className="text-xs text-[#676767]">software developer</span>
                            </div>
                          </div>
                          <button className="py-1 px-3 border-[#0792f2] rounded border text-xs text-[#0792f2] hover:bg-[#0792f2] hover:text-white">
                            Follow
                          </button>
                        </div>
                      </div>
                    );
                  } else if (result.type === "post") {
                    console.log(result)
                    return (
                      <PostCard key={index} data={result} />
                    );
                  }
                  return null;
                })}

                {searchResults.length < 1 && <div className=" text-xs flex items-center gap-2 text-red-500"><BsEmojiExpressionless className=" text-sky-500" /><p>No result found</p></div>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-5">
            <div onClick={() => { dispatch(setDrawerOpen()), handleSeenNotification(user?._id) }} className={`h-10 w-10 rounded-full flex items-center justify-center text-[22px] cursor-pointer transition-all ease-linear duration-150 relative ${theme ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200 "}`}>
              <AiOutlineBell />
              <div className={`absolute -top-0.5 -right-0.5 w-fit h-fit text-[10px] font-medium px-1.5 ${unseenNotificationCount > 9 && "pr-1"} py-[1px] bg-red-600 text-white rounded-full`}>
                {unseenNotificationCount > 9 ? `${unseenNotificationCount}+` : unseenNotificationCount}
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="flex items-center gap-2 cursor-pointer">
                  <div className="rounded-full border border-2 p-[1px] border-emerald-500">
                    <img
                      src={profilePicture ? profilePicture : profile}
                      className="h-10 w-10 object-cover bg-gray-600 rounded-full"
                      alt={user?.username}
                    />
                  </div>
                  <BsChevronDown className=" text-sm" />
                </div>
                <ul
                  tabIndex={0}
                  className={`relative dropdown-content z-[1] menu p-2 shadow bg-gradient-to-tr rounded-box w-56 border border-1 mt-2 shadow-lg ${!theme ? 'from-blue-50 to-pink-50' : 'from-gray-800 to-slate-600'}`}
                >
                  {/* <div className="bg-slate-600 h-5 w-5 rotate-45 absolute -top-[10px] border-t border-l right-9"></div> */}
                  <div className="px-4 py-3 flex flex-col">
                    <span title={fullname} className="font-semibold text-md text-primary">
                      {fullname?.length > 15 ? fullname?.slice(0, 14) + ".." : fullname ? fullname : "New User"}
                    </span>
                    <span className="text-xs text-primary">
                      {user?.email?.length > 20 ? user?.email?.slice(0, 20) + ".." : user?.email ? user?.email : "New User"}
                    </span>
                  </div>
                  <hr className="mb-3" />
                  <li>
                    <Link to="/profile">
                      <FaRegUser /> See Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/save-post">
                      <BsBookmark /> Saved Post
                    </Link>
                  </li>
                  <li>
                    <div>
                      {
                        theme ? <>
                          <BsSun className="w-4 h-4 swap-on" />
                          Light Mode
                        </> : <>
                          <BsMoonStars className="w-4 h-4 swap-off" />
                          Dark Mode
                        </>
                      }
                      <button
                        onChange={handleToggle} className="">
                        <label className="swap swap-rotate h-6 w-6">
                          <input
                            type="checkbox"
                            checked={theme}
                          />
                          <div className={`h-5 w-11 flex items-center rounded-full ${!theme ? 'bg-gray-200' : 'bg-gray-500'}`}>
                            <div className={`h-4 w-4 rounded-full bg-white ml-1 transition duration-300  ${theme ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                        </label>
                      </button>
                    </div>
                  </li>
                  <li>
                    <Link to="/settings">
                      <IoSettingsOutline /> Settings
                    </Link>
                  </li>
                  <hr className="mt-2 mb-3" />
                  <li>
                    <button
                      onClick={() => handleLogOut()}
                      className="text-error hover:bg-error hover:text-base-100"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationDrawer />
    </>
  );
};

export default Navbar;
