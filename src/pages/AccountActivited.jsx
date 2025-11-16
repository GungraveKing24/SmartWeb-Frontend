import { Link } from "react-router-dom";

export default function AccountActivated() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl p-10 max-w-md text-center border border-base-300">
        
        {/* Icono */}
        <div className="text-green-500 text-7xl mb-4">
          ✓
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold mb-3 text-success">
          ¡Cuenta Activada!
        </h1>

        {/* Mensaje */}
        <p className="text-base opacity-80 mb-6">
          Tu cuenta ha sido verificada correctamente.  
          Ya puedes iniciar sesión y comenzar a usar la plataforma.
        </p>

        {/* Botón */}
        <Link
          to="/login"
          className="btn btn-primary w-full mt-4"
        >
          Ir al Login
        </Link>
      </div>
    </div>
  );
}

