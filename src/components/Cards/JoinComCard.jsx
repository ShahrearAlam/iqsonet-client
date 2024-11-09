/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import RoundeBtn from "../Sheard/RoundeBtn";

const JoinComCard = ({ data }) => {
  const { theme } = useSelector(state => state.theme)
  const { groupName, coverImg, member } = data;
  return (
    <div className={`flex gap-2 justify-between items-center ${theme ? "  hover:bg-[#282828]" : 'hover:bg-gray-100'}  shadow py-1 rounded-lg px-1`}>
      <div className="flex items-center gap-2">
        <img
          src={coverImg}
          className="h-10 w-10 object-cover rounded-[10px] "
          alt={groupName}
        />
        <div>
          <span className="block font-meidum text-[14px] text-primary leading-[14px] pt-2">
            {groupName}
          </span>
          <span className="text-xs text-[#676767]">{member} member</span>
        </div>
      </div>
      <RoundeBtn type="button" text='Join' color="bg-sky-500" border='border-sky-500' hover="hover:text-sky-500 hover:bg-transparent" />
    </div>
  );
};

export default JoinComCard;