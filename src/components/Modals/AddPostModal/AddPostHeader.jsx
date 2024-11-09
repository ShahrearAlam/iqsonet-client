/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import profile from "../../../assets/images/profile2.png";

export default function AddPostHeader({ setPostAccessibility }) {
  const { user } = useSelector(state => state.auth);
  const { fullname, profilePicture } = user?.personal || {};

  return (
    <div className=" mb-3 px-1.5 flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <img
          src={profilePicture ? profilePicture : profile}
          className="h-10 w-10 object-cover rounded-[10px] "
          alt="user"
        />
        <div>
          <div>
            <h1 className=" text-sm font-medium">  {fullname ? fullname : user?.username} </h1>
            <p className=" text-xs opacity-70">software developer</p>
          </div>
        </div>
      </div>

      <div>
        <select
          id="countries"
          className="bg-gray-50 border border-blue-300 text-gray-900 text-xs rounded focus:outline-none  block w-full py-2 cursor-pointer px-2 appearance-none"
          onChange={(e) => setPostAccessibility(e.target.value)}
        >
          <option value="public">🌎 Public</option>
          <option value="followersOnly">👥 Friends</option>
          <option value="onlyMe">🔒 Only Me</option>
        </select>
      </div>
    </div >
  );
}
