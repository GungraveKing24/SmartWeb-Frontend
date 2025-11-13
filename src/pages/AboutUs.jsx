"use client"

const AboutUs = () => {
  return (
    <main className="container mx-auto px-6 py-16 font-sans bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
          🌐 Acerca de <span className="text-indigo-600">SMARTWEB</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Somos un equipo apasionado por la educación digital. Combinamos tecnología moderna con
          metodologías efectivas para ofrecer experiencias de aprendizaje únicas.  
          Conoce al equipo que da vida a esta plataforma.
        </p>
      </div>

      {/* Sección del equipo */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 inline-block">
            Equipo de Desarrollo
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Esmeralda García",
              role: "Desarrolladora FrontEnd",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FEsmeralda.jpeg?alt=media&token=3cc316ba-fd2a-4196-b3e2-562eee1d7ec3",
              desc: "Desarrollo de interfaces del sitio y diseño adaptable para diferentes dispositivos.",
            },
            {
              name: "Mario Hernández",
              role: "Desarrollador FrontEnd",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FMario.jpeg?alt=media&token=5a0b1306-f31b-4327-89d8-e3fc1aded579",
              desc: "Implementación de la interfaz de usuario para estudiantes con React y Tailwind.",
            },
            {
              name: "Jorge Cisneros",
              role: "Desarrollador BackEnd",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2F171405822-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg?alt=media&token=e9497eef-93c9-4226-9601-044df19218b3",
              desc: "Gestión de bases de datos, autenticación y seguridad de la información.",
            },
            {
              name: "Fernando Gómez",
              role: "QA Tester & UX Designer",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FFernando.jpeg?alt=media&token=67f48dd0-0446-483f-b611-18167587b8f0",
              desc: "Pruebas de calidad y diseño de experiencias de usuario centradas en la accesibilidad.",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 text-center"
            >
              <div className="relative w-28 h-28 mx-auto mb-5">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-100 group-hover:ring-indigo-300 transition"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-indigo-600 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block text-indigo-500 font-medium text-sm">
                  💡 Innovación y compromiso
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cierre */}
      <footer className="text-center mt-16 border-t border-gray-200 pt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} SMARTWEB — Todos los derechos reservados.
      </footer>
    </main>
  )
}

export default AboutUs
