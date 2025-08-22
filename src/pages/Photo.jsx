import React from "react";

import { uploads } from "../utils/config";

//Lembrando de trazer o loading

// Components
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto } from "../slices/photoSlice";
import PhotoItem from "../components/PhotoItem";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // comentários

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // like e comentário

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#833AB4" size="large" text="" textColor="" />
      </div>
    );
  }

  return (
    <div id="photo" className="w-[50%] m-auto text-center mt-[2em]">
      <PhotoItem photo={photo} className/>
    </div>
  );
};

export default Photo;

//message-contaer{ margin 1em 0}
//.comment{ text-alignt: left}
//.comment form{margin-bottom: 2em, padding-bottom: 1em, border-bottom 1px solid #363636}
//.authot display flex font-weight: bold
//#photo .author img{w- 50px h-50px border-radius mr-1em}

