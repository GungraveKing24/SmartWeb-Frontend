"use client"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content">

      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-content py-16 shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">🔒 Política de Privacidad</h1>
          <p className="text-lg text-primary-content/90 max-w-2xl mx-auto leading-relaxed">
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos y gestionamos tu información.
          </p>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8 relative -mt-16">

          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-end mb-8">
            <span className="badge badge-outline text-sm">
              ⏱️ Última actualización: 15 de Marzo, 2024
            </span>

            <span className="badge badge-outline text-sm">
              🛡️ Cumplimiento GDPR & Leyes Internacionales
            </span>
          </div>

          {/* Introducción */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            1. Introducción
          </h2>
          <p className="mb-6 leading-relaxed">
            En <strong>SMARTWEB</strong> nos comprometemos a proteger tu privacidad. 
            Esta política explica cómo recopilamos, utilizamos y resguardamos tu información personal.
          </p>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-primary mb-1">Transparencia</h4>
            <p className="text-base-content/70 text-sm">
              Creemos en la claridad y te explicamos detalladamente nuestras prácticas y tus derechos.
            </p>
          </div>

          {/* Información que recopilamos */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mt-10 mb-4">
            2. Información que Recopilamos
          </h2>

          <h3 className="text-lg font-semibold text-accent mb-3">2.1 Información Personal</h3>

          <div className="overflow-x-auto mb-6 rounded-lg border border-base-300">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-primary text-primary-content">
                <tr>
                  <th>Tipo</th>
                  <th>Ejemplos</th>
                  <th>Propósito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Registro</td>
                  <td>Nombre, email, nacimiento</td>
                  <td>Crear y gestionar tu cuenta</td>
                </tr>
                <tr>
                  <td className="font-semibold">Información académica</td>
                  <td>Cursos, progreso</td>
                  <td>Servicios educativos</td>
                </tr>
                <tr>
                  <td className="font-semibold">Videollamadas</td>
                  <td>Audio, video, chat</td>
                  <td>Clases en tiempo real</td>
                </tr>
                <tr>
                  <td className="font-semibold">Datos técnicos</td>
                  <td>IP, navegador, dispositivo</td>
                  <td>Seguridad y rendimiento</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-accent mb-3">2.2 Información de Instructores</h3>
          <ul className="list-disc list-inside mb-8 space-y-2">
            <li>Certificaciones</li>
            <li>Datos bancarios (pagos)</li>
            <li>Material educativo</li>
            <li>Experiencia profesional</li>
          </ul>

          {/* Uso de información */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            3. Cómo Utilizamos tu Información
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>📚 Servicios educativos personalizados</li>
            <li>🎥 Gestión de videollamadas</li>
            <li>💳 Procesos de pago seguros</li>
            <li>✉️ Notificaciones importantes</li>
            <li>📊 Optimización de la plataforma</li>
          </ul>

          {/* Compartición */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            4. Compartición de Información
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>👩‍🏫 Con instructores</li>
            <li>💻 Con proveedores (GetStream, hosting, pagos)</li>
            <li>⚖️ Obligaciones legales</li>
          </ul>

          {/* Seguridad */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-6">
            5. Seguridad de Datos
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[ 
              { icon: "🔒", title: "Encriptación", text: "Datos cifrados en tránsito y reposo" },
              { icon: "🛡️", title: "Autenticación", text: "Opciones de seguridad avanzadas" },
              { icon: "👤", title: "Control de Acceso", text: "Solo personal autorizado" },
              { icon: "🔄", title: "Backups", text: "Copias de seguridad frecuentes" },
            ].map((item, i) => (
              <div key={i} className="bg-base-200 border border-base-300 rounded-xl p-6 text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm opacity-70">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Derechos */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            6. Tus Derechos
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>📄 Acceso y rectificación</li>
            <li>🗑️ Eliminación y oposición</li>
            <li>📥 Portabilidad</li>
            <li>✉️ Asistencia directa</li>
          </ul>

          {/* Cookies */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            7. Cookies y Tecnologías
          </h2>
          <p className="mb-6">
            Usamos cookies para seguridad, preferencias y analítica.
          </p>

          {/* Transferencias */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            8. Transferencias Internacionales
          </h2>
          <p className="mb-6">
            Tu información puede procesarse en otros países bajo estándares internacionales.
          </p>

          {/* Contacto */}
          <div className="bg-base-200 border border-base-300 p-6 rounded-xl mt-10">
            <h3 className="text-xl font-bold text-primary mb-3">📞 Contacto</h3>
            <p className="mb-2">Para ejercer tus derechos o resolver dudas:</p>
            <ul className="text-sm space-y-1">
              <li>📧 privacidad@smartweb.edu</li>
              <li>📱 +1 (555) 123-4567</li>
              <li>🏢 Oficina de Protección de Datos, SMARTWEB</li>
            </ul>
          </div>

          {/* Nota final */}
          <div className="bg-base-200 border-l-4 border-primary mt-8 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-1">ℹ️ Nota:</h4>
            <p className="text-sm opacity-80">
              Esta política complementa nuestros Términos de Servicio.
            </p>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-base-content/60 text-sm pb-10">
        © {new Date().getFullYear()} SMARTWEB — Todos los derechos reservados.
      </footer>
    </div>
  )
}
