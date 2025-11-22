"use client"

import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { formatDate, formatIndividualDateNormal } from "../../helpers/date"

const HomeStudent = () => {
  const JWT = localStorage.getItem("token")
  const payload = JSON.parse(atob(JWT.split(".")[1]))

  const [calendar, setCalendar] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = import.meta.env.VITE_BACKEND_URL
        const res = await fetch(url + `/students/calendar/student/${payload.sub}`, {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        })

        const data = await res.json()
        setCalendar(data.calendario ?? [])
        setTotal(data.total ?? 0)
      } catch (error) {
        console.log(error)
        setCalendar([])
        setTotal(0)
      }
    }

    fetchData()
  }, [])

  if (!calendar || calendar.message) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-base-content">
        <p>{calendar.message}</p>
      </div>
    )
  }

  // Ordenar solo si calendar existe, sino usar array vacío
const sortedCalendar = Array.isArray(calendar)
  ? [...calendar].sort((a, b) => {
      const order = { en_curso: 1, futura: 2, proxima: 2, concluida: 3 }
      return order[a.estado] - order[b.estado]
    })
  : []


  return (
    <main className="container mx-auto py-10 px-6 font-sans max-w-6xl bg-base-200 min-h-screen">

      {/* HEADER */}
      <section className="text-center mb-14">
        <h1 className="text-4xl font-bold text-base-content mb-3">👋 ¡Hola, Estudiante!</h1>
        <p className="text-lg opacity-70 mb-10 max-w-2xl mx-auto">
          Accede a tus clases en vivo, revisa tus cursos inscritos y sigue aprendiendo cada día.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">

          {/* Cursos */}
          <Link to="/usuario/miscursos" className="stat bg-base-100 rounded-xl shadow border border-base-200 hover:shadow-lg transition cursor-pointer">
            <div className="stat-value text-primary flex justify-center">
              <BookOpen size={30} />
            </div>
            <div className="stat-desc text-base-content text-center font-medium">
              Cursos Inscritos
            </div>
          </Link>

          {/* Sesiones */}
          <div className="stat bg-base-100 rounded-xl shadow border border-base-200 hover:shadow-lg transition">
            <div className="stat-value text-primary text-center">{total}</div>
            <div className="stat-desc text-base-content text-center font-medium">
              Sesiones esta semana
            </div>
          </div>

        </div>
      </section>

      {/* SESIONES EN VIVO */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-base-content">🎥 Sesiones en Vivo</h2>

          <span className="badge badge-error badge-lg text-white">
            EN VIVO
          </span>
        </div>

        {/* LISTA DE SESIONES */}
        {sortedCalendar.map((session, idx) => (
          <div
            key={idx}
            className={`card shadow-md border border-base-300 hover:shadow-lg transition 
              ${
                session.estado === "concluida"
                  ? "bg-base-300 opacity-70"
                  : session.estado === "en_curso"
                  ? "bg-green-200 border-green-500"
                  : "bg-base-100"
              }
            `}
          >
            <div className="card-body md:flex-row md:items-center md:justify-between">

              {/* INFO */}
              <div>
                <h3 className="font-bold text-lg">{session.curso}</h3>
                <p className="font-semibold">{session.sesion}</p>

                <p className="text-sm opacity-70 mt-2 flex flex-col gap-1">
                  <span>📅 {formatDate(session.hora_inicio)}</span>
                  <span>
                    🕐 {formatIndividualDateNormal(session.hora_inicio, "hour")}:
                    {formatIndividualDateNormal(session.hora_inicio, "minutes")} —{" "}
                    {formatIndividualDateNormal(session.hora_fin, "hour")}:
                    {formatIndividualDateNormal(session.hora_fin, "minutes")}
                  </span>
                  <span>👨‍🏫 {session.profesor}</span>
                </p>
              </div>

              {/* STATUS */}
              {session.estado === "concluida" && (
                <div className="badge badge-success badge-lg text-white">
                  CONCLUIDA
                </div>
              )}
              {session.estado === "futura" && (
                <div className="badge badge-info badge-lg text-white">
                  FUTURA
                </div>
              )}

              {/* BOTÓN */}
              {session.estado !== "concluida" && session.estado !== "futura" && (
                <Link
                  to={session.enlace_llamada}
                  className="btn btn-primary btn-outline btn-sm mt-4 md:mt-0"
                >
                  🚀 Unirse a Clase
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

    </main>
  )
}

export default HomeStudent
