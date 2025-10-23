// src/front/components/Form.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Form = ({ mode = "login" }) => {
  const { dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Email y contraseña son obligatorios.");
      return;
    }

    const endpoint = mode === "signup" ? "/api/signup" : "/api/login";
    const url = import.meta.env.VITE_BACKEND_URL + endpoint;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json().catch(() => ({}));

      if (mode === "login") {
        if (!res.ok || !data?.access_token) {
          alert(data?.msg || "Credenciales inválidas.");
          return;
        }
        localStorage.setItem("token", data.access_token);
        dispatch({ type: "set_auth", payload: true });
      }

      if (mode === "signup") {
        if (!res.ok) {
          alert(data?.msg || "No se pudo crear la cuenta.");
          return;
        }
        alert(data?.msg || "Usuario creado.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red. Verifica el backend.");
    }
  }

  return (
    <form className="w-50 mx-auto" onSubmit={sendData}>
      <div className="mb-3">
        <label
          htmlFor="exampleInputEmail1"
          className={`form-label ${mode === "signup" ? "d-block text-center" : ""}`}
        >
          Email Address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="exampleInputPassword1"
          className={`form-label ${mode === "signup" ? "d-block text-center" : ""}`}
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      {mode === "signup" ? (
        <>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
          <p className="text-center mt-3">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              className="btn btn-link p-0 align-baseline"
              onClick={() => navigate("/login")}
            >
              Volver al login
            </button>
          </p>
        </>
      ) : (
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      )}
    </form>
  );
};

export default Form;
