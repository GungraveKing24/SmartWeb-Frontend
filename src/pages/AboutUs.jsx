"use client"

const AboutUs = () => {
  return (
    <main className="container mx-auto px-6 py-16 font-sans bg-base-200 min-h-screen">

      {/* Encabezado */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-base-content mb-4">
          🌐 Acerca de <span className="text-primary font-bold">SMARTWEB</span>
        </h1>
        <p className="text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
          Somos un equipo apasionado por la educación digital. Combinamos tecnología moderna con
          metodologías efectivas para ofrecer experiencias de aprendizaje únicas.  
          Conoce al equipo que da vida a esta plataforma.
        </p>
      </div>

      {/* Sección del equipo */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-base-content border-l-4 border-primary pl-3 inline-block">
            Equipo de Desarrollo
          </h2>
        </div>
        {/* Descripciones  */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Esmeralda García",
              role: "Desarrolladora FrontEnd",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FEsmeralda.jpeg?alt=media&token=3cc316ba-fd2a-4196-b3e2-562eee1d7ec3",
              desc: "Diseño adaptable e interfaces modernas enfocadas en la experiencia del usuario.",
            },
            {
              name: "Mario Hernández",
              role: "Desarrollador FrontEnd",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FMario.jpeg?alt=media&token=5a0b1306-f31b-4327-89d8-e3fc1aded579",
              desc: "Implementación de la interfaz de usuario con React y DaisyUI.",
            },
            {
              name: "Jorge Cisneros",
              role: "Desarrollador BackEnd",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2F171405822-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg?alt=media&token=e9497eef-93c9-4226-9601-044df19218b3",
              desc: "Manejo de servidores, seguridad y lógica del sistema.",
            },
            {
              name: "Fernando Gómez",
              role: "QA Tester & UX Designer",
              image:
                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FFernando.jpeg?alt=media&token=67f48dd0-0446-483f-b611-18167587b8f0",
              desc: "Pruebas de calidad y mejora continua en la experiencia del usuario.",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="group bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 p-8 text-center"
            >
              <div className="relative w-28 h-28 mx-auto mb-5">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition"
                />
              </div>
              <h3 className="text-lg font-semibold text-base-content">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              <p className="text-base-content/70 text-sm leading-relaxed">{member.desc}</p>

              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block text-primary font-medium text-sm">
                  💡 Innovación y compromiso
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-16 border-t border-base-300 pt-6 text-base-content/60 text-sm">
        © {new Date().getFullYear()} SMARTWEB — Todos los derechos reservados.
      </footer>
    </main>
  )
}

export default AboutUs
