import "./App.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { OrbitProgress } from "react-loading-indicators";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    <OrbitProgress color="#833AB4" size="small" text="" textColor="" />;
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="min-h-screen">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
