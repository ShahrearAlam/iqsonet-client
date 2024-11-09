
import { useDispatch, useSelector } from "react-redux";

// icons
import { FaThumbsUp, FaThumbsDown, FaComment, FaReply, FaUser, FaShare } from "react-icons/fa";
import moment from "moment";
import { notificationIcon } from "../../../utils/tailwindClasses";
import { useReadNotificationMutation } from "../../../feature/notification/notificationApiSlice";
import { useNavigate } from "react-router-dom";
import { setDrawerOpen, updateNotification } from "../../../feature/notification/notification.slice";
import { openNotificationDestination } from "../../../Utils/NotificationUtils";

const dynamicIcon = {
    like: <FaThumbsUp className={notificationIcon} />,
    dislike: <FaThumbsDown className={notificationIcon} />,
    comment: <FaComment className={notificationIcon} />,
    reply: <FaReply className={notificationIcon} />,
    mention: <FaUser className={notificationIcon} />,
    share: <FaShare className={notificationIcon} />,
    request: <FaUser className={notificationIcon} />,
    accept: <FaUser className={notificationIcon} />
};

export default function UnreadNotifications() {

    const { theme } = useSelector(state => state.theme);
    const { unreadNotification } = useSelector(state => state.notification);
    const [readNotification] = useReadNotificationMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNotificationRead = async (id, readingStatus, type, userId, postId) => {
        if (readingStatus === "unread") {
            const res = await readNotification(id);
            if (res?.data) {
                dispatch(updateNotification(res?.data?.data));
            }
        }
        const destination = openNotificationDestination(type, userId, postId);
        navigate(destination);
        dispatch(setDrawerOpen());
    }

    return (
        <div>
            {
                unreadNotification.map(({ _id, type, post, message, user: { _id: userId, personal: { fullname }, username }, readingStatus, createdAt }) => <div onClick={() => { handleNotificationRead(_id, readingStatus, type, userId, post) }} key={_id} className={`flex gap-2 items-start  py-7 px-1 rounded-sm border-b  relative ${theme ? "hover:bg-gray-900 border-b-gray-700" : "hover:bg-gray-50 border-b-gray-200"}`}>
                    <div className={` h-8 w-8  rounded flex items-center justify-center text-xl ${theme ? "bg-gray-800" : "bg-gray-100"} `}>
                        {dynamicIcon[type]}
                    </div>
                    <div>
                        <p className={`text-sm  ${theme ? "text-gray-400" : "text-gray-700"}`}><span className=" font-medium text-primary">{fullname ? fullname : username}</span> {message}</p>
                        <p className=" text-xs mt-1 text-gray-500">{moment(createdAt).fromNow()}</p>
                    </div>
                    <div className=" h-2 w-2 rounded-full bg-sky-500 absolute  right-4 top-4"></div>
                </div>)
            }
        </div>
    )
}
