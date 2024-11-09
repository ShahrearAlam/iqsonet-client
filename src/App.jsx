/* eslint-disable react/prop-types */
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import routes from "./routes/Routes";
import Loader from "./components/Loader/Loader";
import { useUserDataQuery } from "./feature/auth/authApiSlice";
import { accessToken, isAccessTokenExist } from "./Utils/LocalStorage";
import { useEffect } from "react";
import { userLoggedIn } from "./feature/auth/authSlice";
import { useDispatch } from "react-redux";
import "./App.css";

function App() {

  const dispatch = useDispatch();
  const { data, isLoading } = useUserDataQuery("userInfo", { skip: !isAccessTokenExist() });

  useEffect(() => {
    if (data) {
      dispatch(userLoggedIn({ access_token: accessToken(), user: data?.data }))
    }
  }, [data, dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Router>{routes}</Router>
      <Toaster />
    </div>
  )
}

export default App
