import { uploads } from "../utils/config";

// Components
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { OrbitProgress } from "react-loading-indicators";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../slices/userSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  // photo

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#833AB4" size="large" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="py-20 w-[50%] mx-auto">
      <div className="flex items-center flex-wrap p-4 border-b border-[#363636]">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} className="w-[100px] h-[100px] rounded-full mr-[2em]"/>
        )}
        <div>
     <h1 className="text-2xl font-bold mb-3">{user.name}</h1>
<p className="text-base">{user.bio}</p>

        </div>
      </div>
    </div>
  );
};

export default Profile;
