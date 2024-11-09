/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Components
import ReplyCard from "./ReplyCard";
import Button from "../Sheard/Button";

// Utils
import { seeMore } from "../../utils/tailwindClasses";
import { commentReactionCount, isUserCommentReaction } from "../../Utils/PostUtils";

// Redux
import { updateFeedPost } from "../../feature/feed/feedSlice";
import { updateProfilePost } from "../../feature/profile/profileSlice";
import { updateSavePost } from "../../feature/savePost/savePostSlice";
import { useAddCommentMutation, useAddCommentReactionMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../../feature/post/postApiSlice";

// Dumey Image Import
import profile from "../../assets/images/profile2.png";

//  Icons Import
import { BsReplyFill } from "react-icons/bs";
import { TbArrowForward } from "react-icons/tb";
import { MdOutlineUpdate } from "react-icons/md";
import { AiOutlineCloseCircle, AiOutlineDelete, AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";



export default function CommentCard({ comments, data }) {

  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme)
  const { user: loginUser } = useSelector(state => state.auth);
  const { _id, user: postUser } = data || {};


  // For Comment
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [commentValues, setCommentValues] = useState({});
  const [editedComments, setEditedComments] = useState({});
  const [editingCommentIds, setEditingCommentIds] = useState({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    data?.data?.forEach(({ _id }) => {
      if (!commentValues[_id]) {
        setCommentValues((prevState) => ({
          ...prevState,
          [_id]: '',
        }));
      }

      if (!editingCommentIds[_id]) {
        setEditingCommentIds((prevState) => ({
          ...prevState,
          [_id]: null,
        }));
      }

      if (!editedComments[_id]) {
        setEditedComments((prevState) => ({
          ...prevState,
          [_id]: '',
        }));
      }
    });
  }, [data]);


  // For Add comment 
  const handleSubmitComment = async (e, { postId }) => {
    e.preventDefault();

    // For dubble Click handel
    if (isSubmittingComment) {
      return;
    }

    setIsSubmittingComment(true);

    // For Empty value check
    if (!commentValues[postId]) {
      setIsSubmittingComment(false);
      return;
    }

    try {
      const res = await addComment({
        postId,
        userId: loginUser?._id,
        body: commentValues[postId],
      });

      if (res?.data) {
        const updatePostData = res?.data?.data;
        dispatch(updateProfilePost(updatePostData));
        dispatch(updateFeedPost(updatePostData));
        dispatch(updateSavePost(updatePostData));
      }

      setCommentValues((prevState) => ({
        ...prevState,
        [postId]: '',
      }));
      setIsSubmittingComment(false);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setIsSubmittingComment(false);
    }
  };


  // For Update Comment
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedComment(commentText);
  };
  const handleUpdateComment = async (e, { postId, commentId }) => {
    e.preventDefault()
    // Post edited comment
    const res = await updateComment({ userId: loginUser?._id, postId: postId, commentId: commentId, body: editedComment });
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
    // Set default value
    setEditingCommentId(null);
    setEditedComment('');
  }

  // Cancle edit
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };


  // For Delete Comment
  const handleDeleteComment = async ({ userId, postId, commentId }) => {
    const res = await deleteComment({ userId, postId, commentId });
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
  }

  // Comment reaction
  const [addCommentReaction] = useAddCommentReactionMutation();
  const handleCommentReaction = async ({ postId, commentId, type }) => {
    const res = await addCommentReaction({ postId, commentId, userId: loginUser?._id, type })
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
  }


  // Reply
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);

  // Handel Commmnt Showing Count
  const [displayCount, setDisplayCount] = useState(1);

  return (
    <div>
      {/* Add Comment */}
      <div className=" flex items-center gap-2 w-full ">
        <img
          className="rounded-[0.7rem] h-10 w-10  border-warning border-[1px]  bg-gray-600 "
          src={loginUser?.personal?.profilePicture ? loginUser?.personal?.profilePicture : profile}
          alt=""
        />
        <form className=" flex items-center gap-2 w-full" onSubmit={(e) => handleSubmitComment(e, { postId: _id })} >
          <div className=" flex-1">
            <input
              type="text"
              placeholder="Add comment . . ."
              className="border border-warning p-2 w-full  rounded-lg placeholder:text-[13px] focus:outline-none focus:border focus:border-sky-500 bg-transparent "
              value={commentValues[_id]}
              onChange={(e) => setCommentValues((prevValues) => ({ ...prevValues, [_id]: e.target.value }))}

            />
          </div>
          <Button type="submit" text='Add Now' color='bg-[#0792f2]' border='border-[#0792f2]' hover="hover:text-[#0792f2] hover:bg-transparent" />
        </form>
      </div>

      {/* Comment Container */}
      <div className=" my-4 2xl:pl-[2.5vw] xl:pl-[3.8vw] pl-[4vw]  mb-5">

        {
          comments?.slice(0, displayCount)?.map(cmt =>
            <div key={cmt._id} className=" px-2  pt-3  text-xs  relative transition-all ease-linear duration-150">

              <div className=" flex items-start justify-between ">
                <div className=" flex items-center gap-2">
                  <img className=" h-7 w-7 rounded-md bg-gray-600" src={cmt?.user?.personal?.profilePicture ? cmt?.user?.personal?.profilePicture : profile} alt="img" />
                  <div>
                    <h2 className=" text-[13px] font-medium ">{cmt?.user?.personal?.fullname ? cmt?.user?.personal?.fullname : cmt?.user?.username}</h2>
                    <p title={moment(cmt?.createdAt).format("dddd, MMMM D, YYYY [at] h:mm A")} className=" text-[9px] text-gray-500  -mt-[2px]">{moment(cmt?.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>

              {/* Comment body */}
              <div className="flex items-center justify-between mt-4 border-b border-b-warning pb-2">
                {editingCommentId === cmt._id ? (
                  <textarea
                    type="textarea"
                    className="w-full p-2 border rounded outline-none bg-transparent border-warning"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                ) : (
                  <h1>{cmt.body}</h1>
                )}
              </div>


              <div className=" flex  justify-between my-3">
                {/* Comment reaction */}
                <div className=" flex justify-between gap-6">
                  <button onClick={() => handleCommentReaction({ postId: _id, commentId: cmt._id, type: "like" })} className={` text-sm  hover:text-green-500 flex items-start justify-center gap-2 ${isUserCommentReaction(loginUser?._id, cmt?.reactions, "like") && theme ? "text-green-400" : "text-green-700"}  `}>
                    <AiOutlineLike className="text-sm mt-[1px]" />
                    {commentReactionCount(cmt?.reactions, "like")}
                  </button>

                  <button onClick={() => handleCommentReaction({ postId: _id, commentId: cmt._id, type: "dislike" })} className={` text-sm  hover:text-red-500 flex items-start justify-center gap-2 ${isUserCommentReaction(loginUser?._id, cmt?.reactions, "dislike") && theme ? "text-red-500" : "text-red-700"} `}>
                    <AiOutlineDislike className="text-sm mt-1" />
                    {commentReactionCount(cmt?.reactions, "dislike")}
                  </button>
                </div>

                {/* For Comment edit and delete and update */}
                <div className=" flex items-center gap-5 text-lg">
                  <div className=" flex items-center gap-5 text-lg">
                    {loginUser?._id === cmt?.user?._id &&
                      <div>
                        {editingCommentId === cmt._id ? (
                          <div className={`text-[11px] flex items-center gap-1 font-medium  ${theme ? "text-blue-400" : "text-blue-600"} hover:text-sky-600 cursor-pointer`} onClick={(e) => handleUpdateComment(e, { postId: _id, commentId: cmt._id })}>
                            <MdOutlineUpdate className=" text-[15px]" />  Update
                          </div>
                        ) : (
                          <div className={`text-[11px] flex items-center gap-1 font-medium  ${theme ? "text-blue-400" : "text-blue-600"}  hover:text-sky-600 cursor-pointer`} onClick={() => handleEditComment(cmt._id, cmt.body)}>
                            <AiOutlineEdit className=" text-[15px]" /> Edit
                          </div>
                        )}
                      </div>}
                    {(loginUser?._id === cmt?.user?._id || loginUser?._id === postUser?._id) &&
                      <div>
                        {editingCommentId === cmt._id ? (
                          <button className={`text-[11px] flex items-center gap-1 font-medium   ${theme ? "text-red-400" : "text-red-600"} hover:text-pink-700 cursor-pointer`} onClick={handleCancelEdit}>
                            <AiOutlineCloseCircle className=" text-[15px]" /> Cancel
                          </button>
                        ) : (<div className={` text-[11px] flex items-center gap-1 font-medium  ${theme ? "text-red-400" : "text-red-600"} hover:text-pink-700 cursor-pointer`} onClick={() => handleDeleteComment({ userId: cmt?.user?._id, postId: _id, commentId: cmt._id })}>
                          <AiOutlineDelete className=" text-[14px]" /> Delete
                        </div>)}
                      </div>}
                  </div>

                  {/* For orther users */}
                  <button onClick={() => setReplyingToCommentId(cmt._id)} className={`text-[11px] flex items-center  gap-1  ${theme ? "text-blue-400" : "text-blue-600"}font-medium hover:text-sky-600`}><BsReplyFill className=" text-[14px] -mt-[2px]" /> Reply</button>
                </div>
              </div>

              {/* For Reply */}
              <ReplyCard cmt={cmt} replyingToCommentId={replyingToCommentId} setReplyingToCommentId={setReplyingToCommentId} data={data} />
            </div>
          )
        }
        {
          comments?.length > 1 && displayCount < comments?.length && (
            <div className={seeMore}>
              <button
                onClick={() => setDisplayCount((prev) => prev + 3)}
                className="flex items-center gap-1"
              >
                <TbArrowForward className="text-lg" />  See more comments
              </button>
            </div>
          )
        }
      </div >

    </div >

  )
}
