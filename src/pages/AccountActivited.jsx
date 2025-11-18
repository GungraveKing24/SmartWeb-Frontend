import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ActivateAccount() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function activate() {
      try {
        const res = await fetch(url + `/auth/activate/${token}`);

        if (res.ok) {
          setStatus("success");
          setMessage("Tu cuenta ha sido activada correctamente.");
        } else {
          setStatus("error");
          setMessage("El token no es válido o ya fue usado.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Ocurrió un error al activar la cuenta.");
        console.error(error);
      }
    }

    activate();
  }, [token]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl p-10 max-w-md text-center border border-base-300">

        {/* LOADING */}
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
            <p className="opacity-75">Activando tu cuenta, por favor espera...</p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <div className="text-green-500 text-7xl mb-4">✓</div>
            <h1 className="text-3xl font-bold mb-3 text-success">¡Cuenta activada!</h1>
            <p className="opacity-80 mb-6">{message}</p>
            <Link to="/login" className="btn btn-primary w-full">
              Ir al Login
            </Link>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <div className="text-red-500 text-7xl mb-4">✕</div>
            <h1 className="text-3xl font-bold mb-3 text-error">Error</h1>
            <p className="opacity-80 mb-6">{message}</p>
            <Link to="/register" className="btn btn-secondary w-full">
              Volver al registro
            </Link>
          </>
        )}

      </div>
    </div>
  );
}
