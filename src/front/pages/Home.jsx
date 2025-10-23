import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Form from "../components/Form.jsx";
import { Link, Navigate } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    (async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined");
        const response = await fetch(backendUrl + "/api/hello");
        const data = await response.json();
        if (response.ok) dispatch({ type: "set_hello", payload: data.message });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="text-center mt-5">
      {store.auth === true ? (
        <Navigate to="/demo" />
      ) : (
        <>
          <Form />  
          <p className="mt-3">
            ¿No tienes cuenta?{" "}
            <Link to="/signup" className="btn btn-link p-0 align-baseline">
              Sign up
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
