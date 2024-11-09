/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";

// Icons
import { RxCross1 } from "react-icons/rx";

// Components
import NotificationTabs from "./NotificationTabs";
import { setDrawerOpen } from "../../feature/notification/notification.slice";

export default function NotificationDrawer() {

    const { theme } = useSelector(state => state.theme);
    const { drawerOpen } = useSelector(state => state.notification);
    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(setDrawerOpen())} className={`fixed top-0 left-0 w-screen h-screen z-10 bg-gray-500 bg-opacity-5  transition-all ease-linear duration-200 ${drawerOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`h-screen sm:w-[28rem] bg-base-100 absolute  top-0 z-20 p-5 transition-all ease-linear duration-200 overflow-y-auto notification ${drawerOpen ? "right-0" : "-right-[28rem]"} `}>
                {/* Header  */}
                <div>
                    <div className=" flex items-center justify-between">
                        <h2 className="text-primary font-medium text-[17px]">Notifications</h2>
                        <RxCross1
                            onClick={() => dispatch(setDrawerOpen())}
                            className=" cursor-pointer hover:text-red-500 "
                        />
                    </div>
                    <hr className={`my-3 ${theme ? 'border-gray-700' : 'border-gray-300'}`} />
                </div>

                {/* Body Tabs */}
                <NotificationTabs />
            </div>
        </div>

    )
}
