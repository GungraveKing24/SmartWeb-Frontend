import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatIndividualDate, formatDate } from '../../helpers/date';
import { BookOpen } from 'lucide-react';

export default function HomeTeacher() {
  const JWT = localStorage.getItem("token");
  const payload = JSON.parse(atob(JWT.split(".")[1]));

  const [sessions, setSessions] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(url + `/calendar/${payload.sub}`, {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        });

        const data = await res.json();
        setSessions(data.calendario ?? []);
        setTotal(data.calendario.length ?? 0)
      } catch (error) {
        console.log(error);
        setSessions([]);
      }
    }
    fetchData();
  }, []);

  if (!sessions || sessions.message) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-base-content">
        <p>{sessions.message}</p>
      </div>
    )
  }

  // Ordenamiento seguro
const sortedSessions = Array.isArray(sessions)
  ? [...sessions].sort((a, b) => {
      const order = { en_curso: 1, futura: 2, proxima: 2, concluida: 3 };
      return order[a.estado] - order[b.estado];
    })
  : [];


  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/50 text-dark py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">Panel del Docente</h1>
          <p className="text-lg opacity-90 mb-8">
            Gestiona tus cursos, sesiones y estudiantes de manera eficiente.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {/* Cursos */}
            <Link to="/profesor/cursos" className="stat bg-primary/20 backdrop-blur rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <div className="stat-value text-primary flex justify-center">
                <BookOpen size={30} />
              </div>
              <div className="stat-desc text-base-content text-center font-medium">
                Cursos
              </div>
            </Link>

            <div className="card bg-primary/20 backdrop-blur shadow-md text-center">
              <div className="card-body">
                <div className="text-3xl font-bold">{total}</div>
                <div className="text-sm opacity-80">Sesiones esta semana</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <section className="container mx-auto px-5 mb-16 max-w-6xl">
        <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
          <i className="fa-solid fa-bolt"></i> Acciones Rápidas
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "➕",
              title: "Mis Cursos",
              desc: "Visualiza y maneja tus cursos",
              action: "Ver cursos",
              link: "/profesor/cursos",
            },
            {
              icon: "🎥",
              title: "Programar Videollamada",
              desc: "Organiza sesiones en vivo con tus estudiantes y comparte materiales en tiempo real.",
              action: "Programar Sesión",
              link: "/profesor/crear-link",
            },
          ].map((action, idx) => (
            <div key={idx} className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="card-title text-lg justify-center">{action.title}</h3>
                <p className="text-sm opacity-70">{action.desc}</p>
                <Link to={action.link} className="btn btn-primary btn-sm w-full mt-4">
                  {action.action}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximas sesiones */}
      <section className="container mx-auto px-5 mb-16 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sesiones</h2>
        </div>

        <div className="space-y-4">
          {sortedSessions.map((session, idx) => (
            <div
              key={idx}
              className={`card shadow-lg border border-base-300 transition-all hover:shadow-xl
                ${session.estado === "concluida" ? "bg-base-200" : "bg-base-100"}`}
            >
              <div className="card-body md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{session.sesion}</h3>
                  <p className="text-sm opacity-70 flex flex-wrap gap-4">
                    <span>📅 {formatDate(session.hora_inicio)}</span>
                    <span>
                      🕐 {formatIndividualDate(session.hora_inicio, "hour")}:
                      {formatIndividualDate(session.hora_inicio, "minutes")} -
                      {formatIndividualDate(session.hora_fin, "hour")}:
                      {formatIndividualDate(session.hora_fin, "minutes")}
                    </span>
                    <span>👥 {session.participantes} estudiantes</span>
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                  <Link
                    to={session.enlace_llamada}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Iniciar
                  </Link>
                  <Link
                    to={`/profesor/sesion/${session.sesion_id}/participantes`}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Participantes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

