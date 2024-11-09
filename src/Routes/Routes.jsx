/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../layouts/Main";
import Loader from "../components/Loader/Loader";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ResetPasswordRequest from "../pages/Auth/ResetPassword/ResetPasswordRequest";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import RequireAuth from "../pages/Auth/RequireAuth/RequireAuth";
import EmailVerification from "../pages/Auth/EmailVerification/EmailVerification";
import EmailVerified from "../pages/Auth/EmailVerification/EmailVerified";
import PrivacyPolicy from "../pages/Auth/PrivacyPolicy";
import Admin from "../layouts/Admin";



// Profile
const Profile = lazy(() => import("../pages/Profile/Profile"));
const UpdateProfile = lazy(() => import("../pages/Profile/UpdateProfile/UpdateProfile"))
const OtherPorfile = lazy(() => import("../pages/Profile/OtherPorfile"))

const Feed = lazy(() => import("../pages/Feed/Feed"));
const Network = lazy(() => import("../pages/Network/Network"));

// Community
const SingleCommunity = lazy(() => import("../pages/Community/SingleCommunity/SingleCommunity"));
const Community = lazy(() => import("../pages/Community/Community"));
const CreateCommunity = lazy(() => import("../pages/Community/CreateCommunity/CreateCommunity"));

const SerarchResult = lazy(() => import("../pages/SearchResult/SearchResult"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard/Dashboard"));
const Users = lazy(() => import("../pages/Admin/Users/Users"));
const Report = lazy(() => import("../pages/Admin/Report/Report"));
const SavePost = lazy(() => import("../pages/SavePost/SavePost"));
const Resume = lazy(() => import("../pages/ResumeBuilder/Resume"));
const JobProtal = lazy(() => import("../pages/JobPortal/JobProtal"));
const JobDetails = lazy(() => import("../pages/JobPortal/JobDetails/JobDetails"));
const CreateJob = lazy(() => import("../pages/JobPortal/CreateJob/CreateJob"));
const SinglePost = lazy(() => import("../pages/SinglePost/SinglePost"));
const Candidate = lazy(() => import("../pages/JobPortal/Candidate/Candidate"));
const Hiring = lazy(() => import("../pages/JobPortal/Hiring/Hiring"));
const CandidateAppliedDetails = lazy(() => import("../pages/JobPortal/Candidate/CandidateAppliedDetails"));
const Candidatedetails = lazy(() => import("../pages/JobPortal/Hiring/Candidatedetails"));
const HiringDetails = lazy(() => import("../pages/JobPortal/Hiring/HiringDetails"));
const EditJob = lazy(() => import("../pages/JobPortal/CreateJob/EditJob"));
const ResumeTemplate = lazy(() => import("../pages/ResumeBuilder/ResumeTemplate/ResumeTemplate"));
const ResumeForm = lazy(() => import("../pages/ResumeBuilder/ResumeForm/ResumeForm"));



const routes = (

  <Routes>

    {/* User Routes Start*/}
    <Route path="/" element={(
      <Suspense fallback={<Loader />}>
        {/* <RequireAuth> */}
        <Main />
        {/* </RequireAuth> */}
      </Suspense>
    )}>
      <Route index element={<Feed />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<OtherPorfile />} />
      <Route path="/my-network" element={<Network />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/:name" element={<SingleCommunity />} />
      <Route path="/create-community" element={<CreateCommunity />} />
      <Route path="/search" element={<SerarchResult />} />
      <Route path="/save-post" element={<SavePost />} />
      <Route path="/job-portal" element={<JobProtal />} />
      <Route path="/job-details/:id" element={<JobDetails />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/edit-job/:id" element={<EditJob />} />
      <Route path="/candidate" element={<Candidate />} />
      <Route path="/candidateAppliedDetails/:id" element={<CandidateAppliedDetails />} />
      <Route path="/hiring" element={<Hiring />} />
      <Route path="/hiringDetails/:id" element={<HiringDetails />} />
      <Route path="/candidateDetails/:id" element={<Candidatedetails />} />
      <Route path="/resume" element={<Resume />} >
        <Route path="preview" element={<ResumeTemplate />} />
        <Route path="edit" element={<ResumeForm />} />
      </Route>
    </Route>
    {/* User Routes End*/}

    {/* Auth Routes Start*/}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/email-verification" element={(
      <EmailVerified>
        <EmailVerification />
      </EmailVerified>
    )} />
    <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
    <Route path="/reset-password/:email" element={<ResetPassword />} />
    <Route path="/update-profile-info" element={(
      <Suspense fallback={<Loader />}>
        <RequireAuth>
          <UpdateProfile />
        </RequireAuth>
      </Suspense>
    )} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    {/* Auth Routes End*/}

    {/* Admin Routes Start*/}
    <Route path="/admin" element={(
      <Suspense fallback={<Loader />}>
        <RequireAuth>
          <Admin />
        </RequireAuth>
      </Suspense>
    )} >
      <Route index element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="report" element={<Report />} />
    </Route>
    {/* Admin Routes End*/}

  </Routes>
);

export default routes;
