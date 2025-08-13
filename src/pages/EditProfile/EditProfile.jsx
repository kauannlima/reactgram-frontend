import { OrbitProgress } from "react-loading-indicators";
import { useSelector, useDispatch } from "react-redux";

const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { loading, error } = useSelector((state) => state.auth);

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
      <div className="w-[320px] sm:w-[400px] md:w-[500px] px-4">
        <h2 className="text-3xl font-bold mb-1 text-center">
          Edite seus dados
        </h2>
        <p className="text-[#9CA3AF] text-center mb-4" d>
          Adicione uma imagem de perfil e conte mais sobre você...
        </p>
        {/*preview da imagem*/}
        {/*widht 150px height 150px border-radius 50% margin bottom 1em*/}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Nome" className={inputClasses} />
          <input
            type="email"
            placeholder="E-mail"
            disabled
            className={inputClasses}
          />
      <label className="flex flex-col space-y-1">
            <span className="    block mb-1 text-sm font-medium text-gray-300">
              Imagem do Perfil:
            </span>
            <input
              type="file"
              className={fileInputClasses}
            />
          </label>
           <label className="flex flex-col space-y-1">
            <span className="    block mb-1 text-sm font-medium text-gray-300">
              Bio:{" "}
            </span>
            <input
              type="text"
              placeholder="Descrição do perfil"
              className={inputClasses}
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
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
