"use client"

export default function Terms() {
  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content">

      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-content py-16 shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">📘 Términos de Servicio</h1>
          <p className="text-lg text-primary-content/90 max-w-2xl mx-auto leading-relaxed">
            Por favor, revisa detenidamente nuestros términos antes de utilizar la plataforma educativa SMARTWEB.
          </p>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8 -mt-16 relative">

          {/* Badges */}
          <div className="flex justify-end gap-3 mb-8">
            <span className="badge badge-outline text-sm">
              ⏱️ Última actualización: 15 de Marzo, 2024
            </span>
          </div>

          {/* INTRO */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            1. Aceptación de los Términos
          </h2>
          <p className="mb-6 leading-relaxed">
            Al acceder y utilizar <strong>SMARTWEB</strong> (“la Plataforma”), aceptas cumplir con estos
            Términos de Servicio y nuestra <strong>Política de Privacidad</strong>.  
            Si no estás de acuerdo, no podrás utilizar nuestros servicios.
          </p>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-primary mb-1">Importante</h4>
            <p className="text-base-content/70 text-sm">
              Estos términos son un acuerdo legal entre tú y SMARTWEB. Te recomendamos leerlos cuidadosamente.
            </p>
          </div>

          {/* SECCIÓN 2 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            2. Descripción del Servicio
          </h2>
          <p className="mb-6">
            SMARTWEB es una plataforma educativa internacional que conecta estudiantes e instructores
            mediante sesiones de videollamada en tiempo real.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>🎥 Videollamadas educativas</li>
            <li>💬 Chat en tiempo real</li>
            <li>📅 Calendarización de clases</li>
            <li>📚 Gestión de cursos</li>
            <li>🔔 Sistema de notificaciones</li>
          </ul>

          {/* SECCIÓN 3 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            3. Registro y Cuenta
          </h2>

          <h3 className="text-lg font-semibold text-accent mb-3">3.1 Elegibilidad</h3>
          <p className="mb-6">
            Debes tener al menos 13 años para registrarte.  
            Si eres menor de 18, requieres consentimiento de un tutor legal.
          </p>

          <h3 className="text-lg font-semibold text-accent mb-3">3.2 Verificación de Instructores</h3>
          <p className="mb-6">
            Los instructores deben pasar por un proceso de validación profesional.
          </p>

          <h3 className="text-lg font-semibold text-accent mb-3">3.3 Seguridad de la Cuenta</h3>
          <p className="mb-8">
            Eres responsable de mantener tus credenciales seguras.
          </p>

          {/* SECCIÓN 4 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            4. Conducta del Usuario
          </h2>

          <h3 className="text-lg font-semibold text-accent mb-3">4.1 Conducta Prohibida</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>🚫 Compartir enlaces privados</li>
            <li>🚫 Grabar clases sin consentimiento</li>
            <li>🚫 Publicar contenido ofensivo o ilegal</li>
            <li>🚫 Cometer fraudes o engaños</li>
          </ul>

          <h3 className="text-lg font-semibold text-accent mb-3">4.2 Propiedad Intelectual</h3>
          <p className="mb-8">
            El material educativo es propiedad de los instructores y no puede redistribuirse.
          </p>

          {/* SECCIÓN 5 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            5. Sesiones de Videollamada
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>⚙️ Podrían ocurrir interrupciones técnicas.</li>
            <li>🎥 Las grabaciones requieren autorización.</li>
          </ul>

          {/* SECCIÓN 6 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            6. Pagos y Facturación
          </h2>
          <p className="mb-3">
            Los instructores establecen sus tarifas, y SMARTWEB puede aplicar comisiones.
          </p>
          <p className="mb-8">
            Las políticas de reembolso dependen de cada instructor.
          </p>

          {/* SECCIÓN 7 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            7. Privacidad y Datos
          </h2>
          <p className="mb-8">
            Tus datos están protegidos según nuestra{" "}
            <a href="/privacy" className="link link-primary font-semibold">
              Política de Privacidad
            </a>.
          </p>

          {/* SECCIÓN 8 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            8. Limitación de Responsabilidad
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>⏸️ Interrupciones del servicio</li>
            <li>📚 Contenido de los instructores</li>
            <li>💻 Fallos en dispositivos del usuario</li>
          </ul>

          {/* SECCIÓN 9 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            9. Modificaciones del Servicio
          </h2>
          <p className="mb-8">
            SMARTWEB puede modificar políticas o servicios con previo aviso.
          </p>

          {/* SECCIÓN 10 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            10. Terminación
          </h2>
          <p className="mb-8">
            Podemos suspender cuentas que violen los términos.
          </p>

          {/* SECCIÓN 11 */}
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
            11. Ley Aplicable
          </h2>
          <p className="mb-8">
            Este acuerdo se rige por leyes internacionales.
          </p>

          {/* Contacto */}
          <div className="bg-base-200 border border-base-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">📞 Contacto</h3>
            <p className="mb-2">Si tienes preguntas sobre estos términos:</p>
            <ul className="text-sm space-y-1">
              <li>📧 legal@smartweb.edu</li>
              <li>📱 +1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Nota final */}
          <div className="bg-base-200 border-l-4 border-primary p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-1">ℹ️ Nota importante:</h4>
            <p className="text-sm">
              En caso de discrepancia entre versiones traducidas, prevalece la versión en español.
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
