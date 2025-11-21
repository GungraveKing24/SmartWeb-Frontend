"use client"

export default function Terms() {
  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-content py-16 shadow-md w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            📘 Términos de Servicio
          </h1>
          <p className="text-base sm:text-lg text-primary-content/90 max-w-2xl mx-auto leading-relaxed">
            Por favor, revisa detenidamente nuestros términos antes de utilizar la plataforma educativa SMARTWEB.
          </p>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <section className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 sm:p-8 -mt-16 relative animate-slideUp space-y-8">

          {/* Badges */}
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3 mb-4">
            <span className="badge badge-outline text-sm">
              ⏱️ Última actualización: 15 de Noviembre, 2025
            </span>
          </div>

          {/* SECCIONES */}
          {[{
            title: "1. Aceptación de los Términos",
            content: (
              <>
                <p>
                  Al acceder y utilizar <strong>SMARTWEB</strong> (“la Plataforma”), aceptas cumplir con estos
                  Términos de Servicio y nuestra <strong>Política de Privacidad</strong>. Si no estás de acuerdo, no podrás utilizar nuestros servicios.
                </p>
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-primary mb-1">Importante</h4>
                  <p className="text-base-content/70 text-sm">
                    Estos términos son un acuerdo legal entre tú y SMARTWEB. Te recomendamos leerlos cuidadosamente.
                  </p>
                </div>
              </>
            )
          }, {
            title: "2. Descripción del Servicio",
            content: (
              <>
                <p>SMARTWEB es una plataforma educativa internacional que conecta estudiantes e instructores mediante sesiones en tiempo real.</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>🎥 Videollamadas educativas</li>
                  <li>💬 Chat en tiempo real</li>
                  <li>📅 Calendarización de clases</li>
                  <li>📚 Gestión de cursos</li>
                  <li>🔔 Sistema de notificaciones</li>
                </ul>
              </>
            )
          }, {
            title: "3. Registro y Cuenta",
            content: (
              <>
                <h3 className="text-lg font-semibold text-accent mt-3">3.1 Elegibilidad</h3>
                <p>Debes tener al menos 13 años para registrarte. Si eres menor de 18, requieres autorización.</p>

                <h3 className="text-lg font-semibold text-accent mt-4">3.2 Verificación de Instructores</h3>
                <p>Los instructores deben pasar por un proceso de validación profesional.</p>

                <h3 className="text-lg font-semibold text-accent mt-4">3.3 Seguridad de la Cuenta</h3>
                <p>Eres responsable de mantener tus credenciales seguras.</p>
              </>
            )
          }, {
            title: "4. Conducta del Usuario",
            content: (
              <>
                <h3 className="text-lg font-semibold text-accent mb-2">4.1 Conducta Prohibida</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>🚫 Compartir enlaces privados</li>
                  <li>🚫 Grabar clases sin consentimiento</li>
                  <li>🚫 Publicar contenido ofensivo o ilegal</li>
                  <li>🚫 Cometer fraudes o engaños</li>
                </ul>
                <h3 className="text-lg font-semibold text-accent mt-4">4.2 Propiedad Intelectual</h3>
                <p>El material educativo es propiedad de los instructores y no puede redistribuirse.</p>
              </>
            )
          }, {
            title: "5. Sesiones de Videollamada",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>⚙️ Podrían ocurrir interrupciones técnicas.</li>
                <li>🎥 Las grabaciones requieren autorización previa.</li>
              </ul>
            )
          }, {
            title: "6. Pagos y Facturación",
            content: (
              <>
                <p>Los instructores establecen sus tarifas, y SMARTWEB puede aplicar comisiones.</p>
                <p className="mt-2">Las políticas de reembolso dependen de cada instructor.</p>
              </>
            )
          }, {
            title: "7. Privacidad y Datos",
            content: (
              <p>
                Tus datos están protegidos según nuestra {" "}
                <a href="/privacy-policy" className="link link-primary font-semibold">Política de Privacidad</a>.
              </p>
            )
          }, {
            title: "8. Limitación de Responsabilidad",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>⏸️ Interrupciones del servicio</li>
                <li>📚 Contenido de los instructores</li>
                <li>💻 Fallos en dispositivos del usuario</li>
              </ul>
            )
          }, {
            title: "9. Modificaciones del Servicio",
            content: (<p>SMARTWEB puede modificar políticas o servicios con previo aviso.</p>)
          }, {
            title: "10. Terminación",
            content: (<p>Podemos suspender cuentas que violen los términos.</p>)
          }, {
            title: "11. Ley Aplicable",
            content: (<p>Este acuerdo se rige por leyes internacionales.</p>)
          }].map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-1">
                {section.title}
              </h2>
              <div className="text-base-content/80 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}

          {/* Contacto */}
          <div className="bg-base-200 border border-base-300 rounded-xl p-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-primary mb-3">📞 Contacto</h3>
            <p className="mb-2">Si tienes preguntas sobre estos términos:</p>
            <ul className="text-sm space-y-1">
              <li>📧 legal@smartweb.edu</li>
              <li>📱 +1 (555) 123-4567</li>
            </ul>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-base-content/60 text-sm pb-10 animate-fadeIn">
        © {new Date().getFullYear()} SMARTWEB — Todos los derechos reservados.
      </footer>
    </div>
  )
}
