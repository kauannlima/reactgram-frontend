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
import { useResetComponentMessage } from "../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../slices/photoSlice";
import PhotoItem from "../components/PhotoItem";
import LikeContainer from "../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState("");

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // like e comentário
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("");

    resetMessage();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#833AB4" size="large" text="" textColor="" />
      </div>
    );
  }

  return (
    <div id="photo" className="w-full max-w-3xl mx-auto mt-8 text-center">
  {/* Foto */}
  <PhotoItem photo={photo} className="mb-4 rounded-md" />

  {/* Likes */}
  <LikeContainer photo={photo} user={user} handleLike={handleLike} />

  {/* Mensagens */}
  <div className="my-4">
    {error && <Message msg={error} type="error" />}
    {message && <Message msg={message} type="success" />}
  </div>

  {/* Comentários */}
  <div className="text-left">
    {photo.comments && (
      <>
        <h3 className="text-xl font-bold mb-3">Comentários ({photo.comments.length})</h3>
        <form
          className="mb-6 pb-4 border-b border-[#363636] flex gap-3"
          onSubmit={handleComment}
        >
          <input
            type="text"
            placeholder="Insira o seu comentário..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText || ""}
            className="flex-1 rounded px-4 py-3 bg-[#121212] text-gray-200 border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#833AB4] transition"
          />
          <input
            type="submit"
            value="Enviar"
            className="w-28 cursor-pointer bg-[#833AB4] text-white font-bold py-3 rounded hover:bg-[#6c2d95] transition"
          />
        </form>

        {photo.comments.length === 0 && <p className="text-gray-400">Não há comentários...</p>}

        {photo.comments.map((comment) => (
          <div className="mb-4" key={comment.comment}>
            <div className="flex items-center mb-1">
              {comment.userImage && (
                <img
                  src={`${uploads}/users/${comment.userImage}`}
                  alt={comment.userName}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              )}
              <Link to={`/users/${comment.userId}`}>
                <p className="font-bold text-gray-200 hover:text-[#833AB4] transition">{comment.userName}</p>
              </Link>
            </div>
            <p className="pl-16 text-gray-300">{comment.comment}</p>
          </div>
        ))}
      </>
    )}
  </div>
</div>
  )
};

export default Photo;

