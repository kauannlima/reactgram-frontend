import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

//Components
import { OrbitProgress } from "react-loading-indicators";
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };

  const inputClasses = `
    w-full
    rounded
    px-4 py-3
    bg-[#121212] text-gray-200
    border border-[#374151]
    focus:outline-none focus:ring-2 focus:ring-[#833AB4]
    transition
  `;

  const fileInputClasses = `
    block w-full text-sm text-gray-200
    file:mr-4 file:py-2 file:px-4
    file:rounded file:border-0
    file:text-sm file:font-semibold
    file:bg-[#833AB4] file:text-white
    hover:file:bg-[#6c2d95]
    cursor-pointer
  `;

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="w-[320px] sm:w-[400px] md:w-[500px] px-4 ">
        <h2 className="text-3xl font-bold mb-1 text-center">
          Edite seus dados
        </h2>
        <p className="text-[#9CA3AF] text-center mb-4">
          Adicione uma imagem de perfil e conte mais sobre você...
        </p>
        {(user.profileImage || previewImage) && (
          <div className="flex items-center justify-center">
            {" "}
            <img
              className="w-[150px] h-[150px] rounded-full mb-4 justify-center"
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user.profileImage}`
              }
              alt={user.name}
            />
          </div>
        )}
        {/*widht 150px height 150px border-radius 50% margin bottom 1em*/}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nome"
            className={inputClasses}
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
          <input
            type="email"
            placeholder="E-mail"
            disabled
            className={inputClasses}
            value={email || ""}
          />
          <label className="flex flex-col space-y-1">
            <span className="    block mb-1 text-sm font-medium text-gray-300">
              Imagem do Perfil:
            </span>
            <input
              type="file"
              className={fileInputClasses}
              onChange={handleFile}
            />
          </label>
          <label className="flex flex-col space-y-1">
            <span className="  block mb-1 text-sm font-medium text-gray-300">
              Bio:
            </span>
            <input
              type="text"
              placeholder="Descrição do perfil"
              className={inputClasses}
              onChange={(e) => setBio(e.target.value)}
              value={bio || ""}
            />
          </label>
          <label className="flex flex-col space-y-1">
            <span className="    block mb-1 text-sm font-medium text-gray-300">
              Quer alterar sua senha?
            </span>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              className={inputClasses}
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </label>
          <div className="h-[48px] flex justify-center items-center">
            {!loading ? (
              <input
                type="submit"
                value="Atualizar"
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
          </div>
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
