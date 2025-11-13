"use client"

import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { formatDate, formatIndividualDate } from "../../helpers/date"

const HomeStudent = () => {
  const JWT = localStorage.getItem("token");
  const payload = JSON.parse(atob(JWT.split(".")[1]));

  const [calendar, setCalendar] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchData(){
      try {
        const url = import.meta.env.BACKEND_URL
        const res = await fetch(url + `/students/calendar/student/${payload.sub}`,{
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
        })

        const data = await res.json()
        console.log(data)

        setCalendar(data.calendario)
        setTotal(data.total)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="container mx-auto py-10 px-6 font-sans max-w-6xl bg-gray-50 min-h-screen">
      {/* Header de bienvenida */}
      <section className="text-center mb-14">
        <h1 className="text-4xl font-semibold text-gray-800 mb-3">👋 ¡Hola, Estudiante!</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Accede a tus clases en vivo, revisa tus cursos inscritos y sigue aprendiendo cada día.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link className="stat bg-white rounded-2xl p-6 shadow border border-gray-100 hover:shadow-md transition">
            <div className="stat-value text-3xl font-bold text-indigo-600">
              <BookOpen size={30} />
            </div>
            <span className="stat-desc text-gray-600 font-medium">Cursos Inscritos</span>
          </Link>
          <div className="stat bg-white rounded-2xl p-6 shadow border border-gray-100 hover:shadow-md transition">
            <div className="stat-value text-3xl font-bold text-indigo-600">{total}</div>
            <div className="stat-desc text-gray-600 font-medium">Sesiones en la semana</div>
          </div>
        </div>
      </section>

      {/* Sesión en Vivo */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">🎥 Sesión en Vivo</h2>
          <span className="bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full text-sm border border-red-200">
            EN VIVO
          </span>
        </div>

        {calendar.map((session, idx) => (
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
                    <h3 className="font-semibold text-lg mb-2">{session.curso}</h3>
                    <h4 className="font-semibold text-lg mb-2">{session.sesion}</h4>
                    <p className="text-sm opacity-70 flex flex-wrap gap-4">
                      <span>📅 {formatDate(session.hora_inicio)}</span>
                        <span>🕐 {formatIndividualDate(session.hora_inicio, "hour")}:{formatIndividualDate(session.hora_inicio, "minutes")} - {formatIndividualDate(session.hora_fin, "hour")}:{formatIndividualDate(session.hora_fin, "minutes")}</span>
                      <span>👨‍🏫 {session.profesor}</span>
                    </p>
                    <p>{calendar.descripcion}</p>
                  </div>
                  {
                    session.estado != "concluida" && session.estado != "futura" ? (
                      <Link to={session.enlace_llamada} className="btn btn-outline btn-primary btn-sm mt-4 md:mt-0 md:flex-shrink-0">🚀 Unirse a Clase</Link>
                    ) : null
                  }
                </div>
              </div>
        ))}

      </section>

      {/* Mis Cursos */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">📚 Mis Cursos</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🗣️",
              title: "Inglés Conversacional",
              schedule: "Lunes y Miércoles - 6:00 PM",
              sessions: "12 sesiones/mes",
            },
            {
              icon: "💻",
              title: "Programación Web",
              schedule: "Martes y Jueves - 2:00 PM",
              sessions: "8 sesiones/mes",
            },
            {
              icon: "🎨",
              title: "Diseño Gráfico",
              schedule: "Jueves - 10:00 AM",
              sessions: "4 sesiones/mes",
            },
          ].map((course, idx) => (
            <div
              key={idx}
              className="card bg-white rounded-2xl shadow border border-gray-100 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="card-body items-center text-center p-6">
                <div className="text-5xl mb-3">{course.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.schedule}</p>
                <div className="mt-2 mb-4 text-sm text-gray-500">📹 {course.sessions}</div>
                <button className="btn btn-outline btn-primary btn-sm w-full">Ver Sesiones</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomeStudent
