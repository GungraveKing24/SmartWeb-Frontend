import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatIndividualDate, formatDate } from '../../helpers/date';

export default function HomeTeacher() {
  const JWT = localStorage.getItem("token");
  const payload = JSON.parse(atob(JWT.split(".")[1]));

  const [sessions, setSessions] = useState([])

  useEffect(() => {
    async function fetchData(){
      try {
        const url = import.meta.env.BACKEND_URL
        const res = await fetch(url + `http://127.0.0.1:8000/calendar/${payload.sub}`,{
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
        })

        const data = await res.json()

        setSessions(data.calendario)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/50 text-dark py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">Panel del Docente</h1>
          <p className="text-lg opacity-90 mb-8">Gestiona tus cursos, sesiones y estudiantes de manera eficiente.</p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm opacity-80">Cursos Activos</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
              <div className="text-3xl font-bold">142</div>
              <div className="text-sm opacity-80">Estudiantes</div>
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
              link: "/profesor/crear-link"
            },
          ].map((action, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow"
            >
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
          <h2 className="text-2xl font-bold">Próximas Sesiones</h2>
          <a href="#" className="link link-primary font-semibold">
            Ver todas
          </a>
        </div>

        <div className="space-y-4">
            {sessions.map((session, idx) => (
            <div
              key={idx}
                className={`card bg-base-100 shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow space-y-4
                  ${session.estado == "concluida" ? "bg-gray-200 text-gray-500"
                  : session.estado === "en_curso" ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-white"}
                `}
            >
              <div className="card-body md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{session.sesion}</h3>
                  <p className="text-sm opacity-70 flex flex-wrap gap-4">
                    <span>📅 {formatDate(session.hora_inicio)}</span>
                      <span>🕐 {formatIndividualDate(session.hora_inicio, "hour")}:{formatIndividualDate(session.hora_inicio, "minutes")} - {formatIndividualDate(session.hora_fin, "hour")}:{formatIndividualDate(session.hora_fin, "minutes")}</span>
                    <span>👥 {session.participantes} estudiantes</span>
                  </p>
                </div>
                <Link to={session.enlace_llamada} className="btn btn-outline btn-primary btn-sm mt-4 md:mt-0 md:flex-shrink-0">Iniciar</Link>
                <Link to={`/profesor/sesion/${session.sesion_id}/participantes`} className="btn btn-outline btn-primary btn-sm mt-4 md:mt-0 md:flex-shrink-0">Participantes</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sesiones realizadas */}
      <section className="container mx-auto px-5 mb-16 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">Sesiones Realizadas</h2>

        <div className="space-y-4">
          {[
            {
              title: "Matemáticas Avanzadas - Vectores y Matrices",
              date: "Lunes, 3 Febrero",
              time: "4:00 PM - 5:30 PM",
            },
            { title: "Introducción a Física - Cinemática", date: "Miércoles, 5 Febrero", time: "2:00 PM - 3:30 PM" },
            {
              title: "Fundamentos de Programación - Estructuras de Control",
              date: "Viernes, 7 Febrero",
              time: "7:00 PM - 8:30 PM",
            },
          ].map((session, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-sm border-l-4 border-base-300 hover:shadow-md transition-shadow"
            >
              <div className="card-body md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{session.title}</h3>
                  <p className="text-sm opacity-70 flex flex-wrap gap-4">
                    <span>📅 {session.date}</span>
                    <span>🕐 {session.time}</span>
                    <span className="text-success font-semibold">✓ Completada</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
