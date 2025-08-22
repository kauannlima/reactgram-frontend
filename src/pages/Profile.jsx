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
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
} from "../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setImage(image);
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    //build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  };

  //Delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#833AB4" size="large" text="" textColor="" />
      </div>
    );
  }

  const inputClasses = `
    w-full
    rounded
    px-4 py-3
    bg-[#121212] text-gray-200
    border border-[#374151]
    focus:outline-none focus:ring-2 focus:ring-[#833AB4]
    transition
    mb-5
  `;

  const fileInputClasses = `
    block w-full text-sm text-gray-200
    file:mr-4 file:py-2 file:px-4
    file:rounded file:border-0
    file:text-sm file:font-semibold
    file:bg-[#833AB4] file:text-white
    hover:file:bg-[#6c2d95]
    cursor-pointer
       mb-5
  `;
  return (
    <div className="py-20 w-[50%] mx-auto">
      <div className="flex items-center flex-wrap p-4 border-b border-[#363636]">
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            className="w-[100px] h-[100px] rounded-full mr-[2em]"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold mb-3">{user.name}</h1>
          <p className="text-base">{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div ref={newPhotoForm} className="p-[1em] border-b border-[#363636]">
            <h3 className="text-xl font-bold my-5 text-left">
              Compartilhe algum momento seu:
            </h3>
            <form onSubmit={submitHandle}>
              <label className="flex flex-col space-y-1">
                <span className="block mb-1 text-sm font-medium text-gray-300">
                  Título para a foto:
                </span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                  className={inputClasses}
                />
              </label>
              <label className="flex flex-col space-y-1">
                <span className="block mb-1 text-sm font-medium text-gray-300">
                  Imagem:
                </span>
                <input
                  type="file"
                  onChange={handleFile}
                  className={fileInputClasses}
                />
              </label>
              {!loading ? (
                <input
                  type="submit"
                  value="Postar"
                  className="w-full cursor-pointer bg-[#833AB4] text-white font-bold py-3 rounded hover:bg-[#6c2d95] transition"
                />
              ) : (
                <OrbitProgress
                  color="#833AB4"
                  size="small"
                  text=""
                  textColor=""
                />
              )}
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h3 className="text-xl font-bold my-5 text-left">Fotos publicadas:</h3>
        <div className="flex flex-wrap ">
          {/*Possivelmente irei tirar essa definição de height máximo */}
          {photos &&
            photos.map((photo) => (
              <div className="w-[32%] m-[0.3%]" key={photo._id}>
                {photo.image && (
                  <img
                    className="w-full h-[27em] object-cover"
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="flex justify-around p-[10px]">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill className="cursor-pointer" />
                    </Link>
                    <BsPencilFill
                      onClick={() => handleEdit(photo)}
                      className="cursor-pointer"
                    />
                    <BsXLg
                      onClick={() => handleDelete(photo._id)}
                      className="cursor-pointer"
                    />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}></Link>
                )}
              </div>
            ))}
          {photos.lenght === 0 && <p>Ainda não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  );
};

{
  /*
  .edit-photo {
  margin-bottom: 1em;
}

.edit-photo img {
  width: 100%;
  margin-bottom: 1em;
}
  
  */
}

export default Profile;
