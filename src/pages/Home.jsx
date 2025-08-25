import React, { useState, useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";
import LikeContainer from "../components/LikeContainer";
import PhotoItem from "../components/PhotoItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../hooks/useResetComponentMessage";
import { getPhotos, like } from "../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0e0e0e]">
        <OrbitProgress color="#833AB4" size="large" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="pt-[2em]">
      <div id="home" className="px-4 w-full max-w-3xl mx-auto">
        {photos && photos.length > 0 ? (
          <div className="flex flex-col gap-10">
            {photos.map((photo) => (
              <div
                key={photo._id}
          
              >
                {/* Foto */}
                <PhotoItem photo={photo} />

                {/* Likes */}
                <LikeContainer
                  photo={photo}
                  user={user}
                  handleLike={handleLike}
                />

                {/* Botão Ver Mais */}
                <div className="flex justify-left pt-4">
                  <Link
                    to={`/photos/${photo._id}`}
                    className="inline-block w-full sm:w-40 text-center cursor-pointer bg-gradient-to-r from-[#833AB4] to-[#6c2d95] text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
                  >
                    Ver mais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-gray-300">
            Ainda não há fotos publicadas,{" "}
            <Link
              to={`/users/${user._id}`}
              className="text-[#3897F0] font-semibold hover:underline transition"
            >
              clique aqui
            </Link>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
