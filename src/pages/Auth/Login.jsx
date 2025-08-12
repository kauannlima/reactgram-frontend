// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { OrbitProgress } from "react-loading-indicators";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const inputClasses = `
    w-full
    rounded
    px-4 py-3
    bg-[#121212] text-gray-200
    border border-[#374151]
    focus:outline-none focus:ring-2 focus:ring-[#833AB4]
    transition
  `;

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="w-[320px] sm:w-[400px] md:w-[500px] px-4">
        <h2 className="text-3xl font-bold mb-1 text-center">ReactGram</h2>
        <p className="text-[#9CA3AF] text-center mb-4">
          Fça o login para ver o que há de novo.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="E-mail"
            className={inputClasses}
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          <input
            type="password"
            placeholder="Senha"
            className={inputClasses}
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
          <div className="h-[48px] flex justify-center items-center">
            {!loading ? (
              <input
                type="submit"
                value="Entrar"
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
          <Message msg={error} type="error" />
        </form>

        <p className="mt-4 text-center">
          Não tem conta?{" "}
          <Link to="/register" className="text-[#3897F0] hover:underline">
            Clique aqui.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
