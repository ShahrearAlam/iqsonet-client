/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Utils
import { seeMore } from "../../utils/tailwindClasses";
import { isUserReplyReaction, postReactionCount, replyReactionCount } from "../../Utils/PostUtils";

// Redux
import { updateFeedPost } from "../../feature/feed/feedSlice";
import { updateProfilePost } from "../../feature/profile/profileSlice";
import { updateSavePost } from "../../feature/savePost/savePostSlice";
import { useAddReplyMutation, useAddReplyReactionMutation, useDeleteReplyMutation, useUpdateReplyMutation } from "../../feature/post/postApiSlice";

// Image Import
import profile from "../../assets/images/profile2.png";

//  Icons Import
import { MdOutlineUpdate } from "react-icons/md";
import { PiArrowBendDownLeft } from "react-icons/pi";
import { AiOutlineCloseCircle, AiOutlineDelete, AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";

export default function ReplyCard({ cmt, replyingToCommentId, setReplyingToCommentId, data }) {

  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme)
  const { user: loginUser } = useSelector(state => state.auth);
  const { _id, user: postUser } = data || {};


  // For  Reply
  const [addReply] = useAddReplyMutation();
  const [updateReply] = useUpdateReplyMutation();
  const [deleteReply] = useDeleteReplyMutation();


  // For Add Reply
  const [reply, setReply] = useState("")
  const handleSubmitReply = async (e, { postId, commentId, userId }) => {
    e.preventDefault()
    if (!reply) return;
    const res = await addReply({ postId, commentId, userId, body: reply });
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
    setReply("")
    setReplyingToCommentId(null)
  }


  // For Update Reply
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedReply, setEditedReply] = useState('');

  const handleEditReply = (replyId, replyText) => {
    setEditingReplyId(replyId);
    setEditedReply(replyText);
  };
  const handleUpdateReply = async (e, { postId, commentId, replyId }) => {
    e.preventDefault()
    // Post edited reply
    const res = await updateReply({ postId, commentId, replyId, userId: loginUser?._id, body: editedReply });
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
    // Set default value
    setEditingReplyId(null);
    setEditedReply('');
    setReplyingToCommentId(null)
  }

  // Cancle reply edit
  const handleCancelReplyEdit = () => {
    setEditingReplyId(null);
    setEditedReply('');
    setReplyingToCommentId(null)
  };


  // For Delete Reply
  const handleDeleteReply = async ({ userId, postId, commentId, replyId }) => {
    const res = await deleteReply({ userId, postId, commentId, replyId });
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
  }

  // Reply reaction
  const [addReplyReaction] = useAddReplyReactionMutation();

  const handleReplyReaction = async ({ postId, commentId, replyId, type }) => {
    const res = await addReplyReaction({ postId, commentId, replyId, userId: loginUser?._id, type })
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
  }

  // Handel Commmnt Showing Count
  const [displayCount, setDisplayCount] = useState(1);

  return (
    <div className={`${cmt?.replies.length > 0 ? "mt-0" : "mt-0"}`}>

      {/* Reply container  */}
      <div className=" p-1 w-full ">
        {
          cmt?.replies?.slice(0, displayCount)?.map(rply => <div className="   mt-5 " key={rply._id}>

            <div className=" flex items-center gap-2 ">
              <img className=" h-7 w-7 rounded-md bg-gray-600" src={rply?.user?.personal?.profilePicture ? rply?.user?.personal?.profilePicture : profile} alt="img" />
              <div>
                <h2 className=" text-[13px] font-medium ">{rply?.user?.personal?.fullname ? rply?.user?.personal?.fullname : rply?.user?.username}</h2>
                <p title={moment(rply?.createdAt).format("dddd, MMMM D, YYYY [at] h:mm A")} className=" text-[9px] text-gray-500  -mt-[2px]">{moment(rply?.createdAt).fromNow()}</p>
              </div>
            </div>

            <div className="mt-4  pl-14">
              <div className=" flex items-center justify-between border-b border-b-warning pb-2 ">
                {/* Reply body */}
                {editingReplyId === rply._id ? (
                  <textarea
                    type="textarea"
                    className="  w-full p-2 border rounded outline-none focus:border focus:border-sky-500 bg-transparent border-warning"
                    value={editedReply}
                    onChange={(e) => setEditedReply(e.target.value)}
                  />
                ) : (
                  <h1> {rply?.body}</h1>
                )}
              </div>

              <div className=" flex justify-between gap-5 text-lg w-full my-3">
                {/* Reply reaction */}
                <div className="  flex  justify-between gap-6 ">
                  <button onClick={() => handleReplyReaction({ postId: _id, commentId: cmt._id, replyId: rply._id, type: "like" })} className={`text-sm  hover:text-green-500  flex justify-center gap-2 ${isUserReplyReaction(loginUser?._id, rply?.reactions, "like") && theme ? "text-green-400" : "text-green-700"}  `}>
                    <AiOutlineLike className=" text-base mt-[1px]" />
                    {replyReactionCount(rply?.reactions, "like")}
                  </button>

                  <button onClick={() => handleReplyReaction({ postId: _id, commentId: cmt._id, replyId: rply._id, type: "dislike" })} className={` text-sm  hover:text-red-500 flex justify-center gap-2 ${isUserReplyReaction(loginUser?._id, rply?.reactions, "dislike") && theme ? "text-red-500" : "text-red-700"} `}>
                    <AiOutlineDislike className=" mt-1 text-base" />
                    {postReactionCount(rply?.reactions, "dislike")}
                  </button>
                </div>


                {/* For update, edit and cancle */}
                <div className=" flex items-center gap-5 text-lg">
                  {loginUser?._id === rply?.user?._id &&
                    <div>
                      {editingReplyId === rply._id ? (
                        <div className={`text-[11px] flex items-center gap-1 font-medium  ${theme ? "text-blue-400" : "text-blue-600"} hover:text-sky-600 cursor-pointer`} onClick={(e) => handleUpdateReply(e, { postId: _id, commentId: cmt._id, replyId: rply?._id })}>
                          <MdOutlineUpdate className=" text-[15px]" />  Update
                        </div>
                      ) : (
                        <div className={`text-[11px] flex items-center gap-1 font-medium  ${theme ? "text-blue-400" : "text-blue-600"} hover:text-sky-600 cursor-pointer`} onClick={() => handleEditReply(rply._id, rply.body)}>
                          <AiOutlineEdit className=" text-[15px]" /> Edit
                        </div>
                      )}
                    </div>}
                  {(loginUser?._id === rply?.user?._id || loginUser?._id === postUser?._id) &&
                    <div>
                      {editingReplyId === rply._id ? (
                        <button className={`text-[11px] flex items-center gap-1 font-medium   ${theme ? "text-red-400" : "text-red-600"} hover:text-pink-700 cursor-pointer`} onClick={handleCancelReplyEdit}>
                          <AiOutlineCloseCircle className=" text-[15px]" /> Cancel
                        </button>
                      ) : (<div className={`text-[11px] flex items-center gap-1 font-medium   ${theme ? "text-red-400" : "text-red-600"} hover:text-pink-700 cursor-pointer`} onClick={() => handleDeleteReply({ userId: rply?.user?._id, postId: _id, commentId: cmt._id, replyId: rply._id })}>
                        <AiOutlineDelete className=" text-[14px]" /> Delete
                      </div>)}
                    </div>}
                </div>
              </div>
            </div>
          </div>)
        }

        <div className="  flex items-center justify-end">
          {
            cmt?.replies?.length > 1 && displayCount < cmt?.replies?.length && (
              <div className={seeMore}>
                <button
                  onClick={() => setDisplayCount((prev) => prev + 3)}
                  className="flex items-center gap-1"
                >
                  More reply <PiArrowBendDownLeft className="text-lg" />
                </button>
              </div>
            )
          }
        </div>
      </div>


      {/* Add reply  box*/}
      <div className=" pl-16">
        {replyingToCommentId === cmt._id && (
          <div className=" flex items-center gap-2 w-full my-2  ">
            <img
              className="rounded-[0.5rem] h-8 w-8  border-warning border-[1px]  bg-gray-600 "
              src={loginUser?.personal?.profilePicture ? loginUser?.personal?.profilePicture : profile}
              alt=""
            />
            <form className=" flex items-center gap-2 w-full"
              onSubmit={(e) => handleSubmitReply(e, { postId: _id, commentId: cmt._id, userId: loginUser?._id })}
            >
              <input
                type="text"
                placeholder="Reply..."
                className=" border border-warning p-2 w-full rounded-lg focus:outline-none focus:border focus:border-sky-500 bg-transparent"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <button type="submit" className=" bg-[#0792f2] py-2 px-5 rounded-lg text-white border border-[#0792f2] hover:bg-transparent hover:text-[#0792f2] transition-all duration-100 ease-in-out">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>

  )
}
