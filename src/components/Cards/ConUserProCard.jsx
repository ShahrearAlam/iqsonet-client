/* eslint-disable react/prop-types */

import { toast } from "react-hot-toast";
import { useSendFollowRequestMutation } from "../../feature/network/networkApiSlice";

// Dummy Image
import dummyUser from '../../assets/images/profile2.png'
import RoundeBtn from "../Sheard/RoundeBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConUserProCard = ({ data }) => {
  const { theme } = useSelector(state => state.theme)
  const { _id, personal, username } = data || {};
  const [sendFollowRequest] = useSendFollowRequestMutation();
  const navigate = useNavigate();

  const handleFollowRequestSend = async (id) => {
    const res = await sendFollowRequest(id);
    if (res?.data) {
      toast.success("Follow Request Sent");
    }
  }

  return (
    <div className={`flex gap-2 justify-between items-center ${theme ? "  hover:bg-[#323232]" : 'hover:bg-gray-100'}  shadow py-1 rounded-lg px-1`}>
      <div className="flex items-center gap-2">
        <img
          onClick={() => navigate(`/profile/${_id}`)}
          src={personal?.profilePicture ? personal?.profilePicture : dummyUser}
          className="h-10 w-10 object-cover rounded-xl bg-gray-600 cursor-pointer"
          alt={username}
        />
        <div>
          <span
            onClick={() => navigate(`/profile/${_id}`)}
            className="block font-meidum text-[14px] text-primary leading-[14px] pt-2 cursor-pointer">
            {personal?.fullname ? personal?.fullname : username}
          </span>
          <span className="text-xs text-[#676767]">Software Developer</span>
        </div>
      </div>

      <RoundeBtn type="button" text='Follow' textColor='text-sky-500' border='border-sky-500' hover="hover:text-white hover:bg-sky-500" onClick={() => handleFollowRequestSend(_id)} />
    </div>
  );
};

export default ConUserProCard;