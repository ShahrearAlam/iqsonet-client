/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import moment from "moment";
import { useState } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";

// Utils
import { extractImageUrls, isUserReaction, postReactionCount } from "../../Utils/PostUtils";

// Components
import EditPostModal from "../../components/Modals/EditPostModal/EditPostModal";

// Redux
import { useAddPostReactionMutation, useCreatePostReportMutation, useDeletePostMutation, useDeleteSavePostMutation, useEditPostMutation, useGetSavePostQuery, useSavePostMutation, useSharePostMutation } from "../../feature/post/postApiSlice";

// Image Import
import profile from "../../assets/images/profile2.png";

//  Icons Import
import { BiDotsHorizontalRounded, BiMessageSquareEdit } from "react-icons/bi";
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { BsBookmark, BsTrash3 } from 'react-icons/bs';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { GoBookmarkSlash } from 'react-icons/go';


import "../../assets/styles/Activity.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import postSliderSettings from "../../components/SliderSettings/SliderSettings";
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "./CommentCard";
import { updateFeedPost } from "../../feature/feed/feedSlice";
import { removeProfilePost, updateProfilePost } from "../../feature/profile/profileSlice";
import { addSavePost, removeSavePost, updateSavePost } from "../../feature/savePost/savePostSlice";
import ReportPostModal from "../Modals/ReportPostModal/ReportPostModal";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import toast from "react-hot-toast";
import PostShareModal from "../Modals/PostShareModal/PostShareModal";

const PostCard = ({ data, postName }) => {

  const { theme } = useSelector(state => state.theme)
  const { user: loginUser } = useSelector(state => state.auth);
  const { otherPorfile } = useSelector(state => state.profile);
  const { _id, body, reactions, createdAt, comments, user, accessibility } = data || {};
  const { fullname, profilePicture } = user?.personal || {};
  const dispatch = useDispatch();


  const [addPostReaction] = useAddPostReactionMutation();
  const [editPost] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [editModal, setEditModal] = useState(false);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState("");
  const [postAccessibility, setPostAccessibility] = useState("public");

  const closeEditModal = () => {
    setEditModal(false);
    setEditId("");
  }

  const handlePostEdit = async () => {
    const res = await editPost({ id: editId, data: { body: value, accessibility: postAccessibility } });
    if (res?.data) {
      dispatch(updateProfilePost(res?.data?.data));
    }
    closeEditModal();
  }



  // For Image Url
  const { imageUrls, cleanedHtml } = extractImageUrls(body);

  const handleReaction = async (addReactionInfo) => {
    const res = await addPostReaction(addReactionInfo);
    if (res?.data) {
      const updatePostData = res?.data?.data;
      dispatch(updateProfilePost(updatePostData))
      dispatch(updateFeedPost(updatePostData))
      dispatch(updateSavePost(updatePostData))
    }
  }

  const editorClassName = !theme ? 'ql-editor dark' : 'ql-editor';


  // Report Modal
  const [createPostReport] = useCreatePostReportMutation();
  const [reportModal, setReportModal] = useState(false);
  const [reportId, setReportId] = useState("");

  const closeReportModal = () => {
    setReportModal(false);
    setReportId("");
  }

  const handleReportSubmit = async (data) => {
    const res = await createPostReport({ reportedPost: reportId, reportType: data.reportType.toLowerCase(), reportBody: data.reportBody });
    if (res?.data) {
      toast.success("Post reported successfully");
      setReportModal(false);
    }
  }


  // Delete Modal
  const [deleteModal, setDeleteModal] = useState();
  const [deleteId, setDeleteId] = useState("");

  const handleDelete = async (id) => {
    const res = await deletePost(id);
    if (res?.data) {
      dispatch(removeProfilePost(res?.data?.data));
      toast.success("Delete Post");
      setDeleteModal(false);
    }
  }


  // Post save
  const { data: savePostData } = useGetSavePostQuery(_id, { skip: _id ? false : true });
  const [savePost] = useSavePostMutation();
  const [deleteSavePost] = useDeleteSavePostMutation();

  const handleAddSavePost = async (id) => {
    const res = await savePost(id);
    if (res?.data) {
      dispatch(addSavePost({ savePosts: [res?.data?.data], infinityScrolling: false }))
      toast.success("Post Save successfully");
    }
  }

  const handleDeleteSavePost = async (id) => {
    const res = await deleteSavePost(id);
    if (res?.data) {
      console.log(res?.data?.data);
      dispatch(removeSavePost(res?.data?.data));
      toast.success("Post Unsaved successfully");
    }
  }

  // Post save or not check function
  function isPostSave() {
    const isSave = savePostData?.data === true ? true : false
    return isSave;
  }


  // Share Post
  const { user: sharedPostOwner } = data?.share || {};
  const [sharePost] = useSharePostMutation();
  const [shareModal, setShareModal] = useState(false);
  const [sharePostId, setSharePostId] = useState("");

  const handleShare = async () => {
    const res = await sharePost({ postId: _id, data: { body, accessibility } });
    if (res?.data) {
      toast.success("Post Share successfully");
      setShareModal(false);
    } else {
      toast.error("Post was Already Shared");
      setShareModal(false);
    }
  }


  return (
    <div key={_id} className=" bg-base-100 p-2 px-4 rounded-2xl  transition-all duration-100 ease-in-out ">

      <div className="py-2 mb-3  ">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="rounded-[0.8rem] h-10 w-10  border-warning border-[1px] bg-gray-600 "
              src={data?.share ? sharedPostOwner?.personal?.profilePicture ? sharedPostOwner?.personal?.profilePicture : profile : profilePicture ? profilePicture : profile}
              alt=""
            />
            <div>
              <h2 className="text-sm">{data?.share ? <div>
                {sharedPostOwner?.personal?.fullname} <span className=" text-gray-500">post shared by</span> {fullname}
              </div> : fullname ? fullname : user?.username}</h2>
              <p title={moment(createdAt).format("dddd, MMMM D, YYYY [at] h:mm A")} className=" text-xs text-gray-400">{moment(createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <button className="btn-ghost p-2 rounded">
              <BiDotsHorizontalRounded
                tabIndex={0}
                className="text-xl text-primary cursor-pointer focus:outline-none"
              />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-lg w-40 border border-1 mt-2  "
            >
              {postName !== "savePost" && !isPostSave() && (
                <li>
                  <Link onClick={() => handleAddSavePost(_id)}>
                    <BsBookmark /> Save Post
                  </Link>
                </li>
              )}

              {(postName === "savePost" || isPostSave()) && (
                <li>
                  <Link onClick={() => handleDeleteSavePost(_id)}>
                    <GoBookmarkSlash /> Unsave
                  </Link>
                </li>
              )}

              {postName === "profilePost" && !otherPorfile && (
                <li>
                  <Link onClick={() => { setEditId(_id), setValue(body), setEditModal(true) }}>
                    <BiMessageSquareEdit /> Edit Post
                  </Link>
                </li>
              )}

              {postName === "profilePost" && !otherPorfile && (
                <li>
                  <button onClick={() => { setDeleteModal(true), setDeleteId(_id) }} className="text-error hover:bg-error hover:text-base-100">
                    <BsTrash3 /> Delete Post
                  </button>
                </li>
              )}

              {postName === "feedPost" && (
                <li>
                  <Link onClick={() => { setReportId(_id), setReportModal(true) }}>
                    <MdOutlineReportGmailerrorred className="text-lg" /> Report
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className=" pt-3 text-[15px]">
          <div className="profile-post-show mt-1">
            {<ReactQuill className={editorClassName} value={cleanedHtml} readOnly={true} theme={"bubble"} />}

            {/* Post Slider Here*/}
            <div className="instagram-slider-container 2xl:max-w-2xl sm:max-w-xl  ">
              <Slider {...postSliderSettings()}>
                {imageUrls?.map((url, i) =>
                  <div key={i} className="instagram-slide ">
                    <img
                      src={url}
                      alt={`Post ${i}`}
                      className=" h-full "
                    />
                  </div>
                )}
              </Slider>
            </div>
          </div>
          {/* Post reaction */}
          <div className=" border border-warning rounded-xl flex items-center justify-between mt-4">
            <button onClick={() => handleReaction({ postId: _id, userId: loginUser?._id, type: "like" })} className={`py-1.5 rounded-xl text-sm btn-ghost ${theme ? "hover:bg-[#323232]" : "hover:bg-gray-200"}  w-1/3 flex items-center justify-center gap-2 ${isUserReaction(loginUser?._id, reactions, "like") && theme ? "text-green-400" : "text-green-700"} pr-3 `}>
              <AiOutlineLike className="text-xl pb-[3px]" />
              {postReactionCount(reactions, "like")}
            </button>
            <button onClick={() => handleReaction({ postId: _id, userId: loginUser?._id, type: "dislike" })} className={`py-1.5 rounded-xl text-sm btn-ghost w-1/3  ${theme ? "hover:bg-[#323232]" : "hover:bg-gray-200"}  flex items-center justify-center gap-2 ${isUserReaction(loginUser?._id, reactions, "dislike") && theme ? "text-red-500" : "text-red-700"} pr-3`}>
              <AiOutlineDislike className="text-xl" />
              {postReactionCount(reactions, "dislike")}
            </button>
            <button className={`py-1.5 rounded-xl text-sm btn-ghost w-1/3 ${theme ? "hover:bg-[#323232]" : "hover:bg-gray-200"} flex items-center justify-center gap-2 text-blue-500 pr-3`}>
              <AiOutlineComment className="text-xl" />
              {comments?.length}
            </button>
            <button onClick={() => { setShareModal(true), setSharePostId(_id) }} className={`py-1.5 rounded-xl text-sm btn-ghost w-1/3 ${theme ? "hover:bg-[#323232]" : "hover:bg-gray-200"} flex items-center justify-center gap-2 text-black-500 pr-3`}>
              <AiOutlineShareAlt className="text-xl" />
              {data?.shareCount ? data?.shareCount : 0}
            </button>
          </div>
        </div>
      </div>



      {/* Comment Section start */}
      <CommentCard comments={comments} data={data} />

      {editModal &&
        <EditPostModal modalData={{ value, setValue, handlePostEdit, closeEditModal, _id, setPostAccessibility }} />
      }

      {reportModal && <ReportPostModal modalData={{ closeReportModal, handleReportSubmit }} />}

      <DeleteModal modalData={{ deleteModal, setDeleteModal, handleDelete, deleteId }} />

      <PostShareModal modalData={{ shareModal, setShareModal, handleShare, sharePostId }} />

    </div>
  );
};

export default PostCard;
