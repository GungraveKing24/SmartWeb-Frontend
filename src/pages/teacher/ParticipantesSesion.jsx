import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotificationModal from "../../components/NotificationModal";

export default function ParticipantesSesion() {
  const { sesion_id } = useParams();
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const fetchParticipantes = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(url + `/participants/call/${sesion_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al obtener los participantes.");
        const data = await res.json();
        setParticipantes(data.participantes || []);
      } catch (err) {
        console.error(err);
        setNotification({ type: "error", message: "❌ Error al cargar los participantes de la sesión." });
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, [sesion_id]);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-primary text-primary-content py-14 px-6 shadow-md">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">👥 Participantes de la Sesión</h1>
          <p className="opacity-90 text-lg">Visualiza los asistentes registrados a esta videollamada.</p>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-14 max-w-5xl">
        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/70">Cargando participantes...</p>
          </div>
        ) : participantes.length === 0 ? (
          <p className="text-center text-base-content/70 py-10 text-lg">No hay participantes en esta sesión 💤</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {participantes.map((p) => (
              <div key={p.id_usuario} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-primary text-primary-content rounded-full w-16">
                      <span className="text-lg font-bold">
                        {p.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <h3 className="card-title text-base-content text-lg">{p.nombre}</h3>
                  <p className="text-sm opacity-70">{p.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volver */}
        <div className="mt-14 text-center">
          <button onClick={() => navigate(-1)} className="btn btn-primary btn-lg px-10 shadow-md">
            ← Volver
          </button>
        </div>
      </main>

      {/* Modal */}
      {notification && (
        <NotificationModal
          isOpen={true}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

