import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "set_auth", payload: false });
    navigate("/login"); // 👈 mejor mandar al login
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/login">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        <div className="ml-auto">
          {store.auth && (
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

