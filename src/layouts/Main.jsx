import { Outlet, useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { setModalPost } from "../feature/modal/modalSlice";

// Icons Import
import { RxCross2 } from "react-icons/rx";

// Components
import Navbar from "../components/Navbar/Navbar";
import SideNav from "../components/Navbar/SideNav";
import BottomNav from "../components/Navbar/BottomNav";
import AddPost from "../components/Modals/AddPostModal/AddPostModal";
import { useEffect, useState } from "react";
import { initializeSocket } from "../Utils/Socket";


const Main = () => {
  const { modalPost } = useSelector(state => state.modal)
  const { user } = useSelector(state => state.auth);
  const [warningShow, setWarningShow] = useState(false);
  const navigate = useNavigate();

  // Socket connection 
  useEffect(() => {
    initializeSocket(user);
  }, [user])

  useEffect(() => {
    const isWarning = (user?.personal?.fullname && user?.personal?.profilePicture) ? false : true
    setWarningShow(isWarning);
  }, [user])

  return (
    <div className="bg-neutral min-h-screen">
      {
        warningShow && (
          <div style={{zIndex:'100'}} className={`sticky top-0 bg-blue-500 bg-opacity-60 h-9 pl-4 transition-all ease-linear duration-500 w-full backdrop-blur text-sm pr-8 flex items-center justify-center`}>
            <p className="flex-1 text-center">Please complete your profile by providing your basic information <span onClick={() => navigate('/update-profile-info')} className=" font-medium cursor-pointer">Update Now</span></p>
            <RxCross2 onClick={() => setWarningShow(false)} className=" text-xl hover:text-red-500 cursor-pointer" />
          </div>
        )
      }
      <div style={{zIndex:'100'}} className={warningShow ? 'sticky top-9' : 'sticky top-0'}>
        <Navbar />
      </div>
      <div className="flex container mx-auto">
        {/* <div className={`lg:w-[460px] xl:w-[460px] md:block hidden border border-warning shadow-md text-gray-600 mt-3 sticky ${warningShow?'top-28 h-[82vh]':'top-[72px] h-[87vh]'} px-2 lg:px-0 bg-base-100 rounded-xl`}> */}
        <div className="2xl:w-[400px] xl:w-[400px] xl:block hidden sticky 2xl:top-[6.7rem] xl:top-[6.6rem] top-[8.1rem] 2xl:h-[82vh] xl:h-[80vh] h-[73vh] 2xl:py-4 py-2 2xl:px-6 pr-0 2xl:pr-0 rounded-3xl shadow border border-warning bg-base-100">
          <SideNav setModalPost={setModalPost} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
        <div className="lg:hidden md:hidden block bg-primary text-base-100 fixed bottom-0 left-0 right-0">
          <BottomNav />
        </div>
      </div>

      <div>
        {modalPost && <AddPost />}
      </div>
    </div>
  );
};

export default Main;
