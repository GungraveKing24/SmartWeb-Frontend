"use client"

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-16 shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">📘 Términos de Servicio</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Por favor, revisa detenidamente nuestros términos antes de utilizar la plataforma educativa SMARTWEB.
          </p>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 -mt-16 relative">
          {/* Badges */}
          <div className="flex justify-end gap-3 mb-8">
            <span className="badge bg-blue-100 text-blue-700 border border-blue-200 text-sm">
              ⏱️ Última actualización: 15 de Marzo, 2024
            </span>
          </div>

          {/* Introducción */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            1. Aceptación de los Términos
          </h2>
          <p className="mb-6 leading-relaxed">
            Al acceder y utilizar <strong>SMARTWEB</strong> (“la Plataforma”), aceptas cumplir con estos Términos de Servicio y
            nuestra <strong>Política de Privacidad</strong>. Si no estás de acuerdo, no podrás utilizar nuestros servicios.
          </p>

          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-indigo-700 mb-1">Importante</h4>
            <p className="text-gray-600 text-sm">
              Estos términos son un acuerdo legal entre tú y SMARTWEB. Te recomendamos leerlos cuidadosamente antes de continuar.
            </p>
          </div>

          {/* Sección 2 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            2. Descripción del Servicio
          </h2>
          <p className="mb-6">
            SMARTWEB es una plataforma educativa internacional que conecta estudiantes e instructores calificados mediante sesiones
            de videollamada en tiempo real.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
            <li>🎥 Videollamadas educativas</li>
            <li>💬 Chat en tiempo real</li>
            <li>📅 Calendarización de clases</li>
            <li>📚 Gestión de cursos</li>
            <li>🔔 Sistema de notificaciones</li>
          </ul>

          {/* Sección 3 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            3. Registro y Cuenta
          </h2>
          <h3 className="text-lg font-semibold text-cyan-700 mb-3">3.1 Elegibilidad</h3>
          <p className="mb-6">
            Debes tener al menos 13 años para registrarte. Si eres menor de 18, necesitas consentimiento de un tutor legal.
          </p>

          <h3 className="text-lg font-semibold text-cyan-700 mb-3">3.2 Verificación de Instructores</h3>
          <p className="mb-6">
            Los instructores deben pasar por un proceso de verificación profesional para garantizar calidad y seguridad.
          </p>

          <h3 className="text-lg font-semibold text-cyan-700 mb-3">3.3 Seguridad de la Cuenta</h3>
          <p className="mb-8">
            Eres responsable de mantener tus credenciales seguras y notificar cualquier uso no autorizado de tu cuenta.
          </p>

          {/* Sección 4 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            4. Conducta del Usuario
          </h2>
          <h3 className="text-lg font-semibold text-cyan-700 mb-3">4.1 Conducta Prohibida</h3>
          <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
            <li>🚫 Compartir enlaces de sesiones con terceros no autorizados</li>
            <li>🚫 Grabar clases sin consentimiento</li>
            <li>🚫 Publicar contenido ofensivo o ilegal</li>
            <li>🚫 Cometer fraudes o actividades engañosas</li>
          </ul>

          <h3 className="text-lg font-semibold text-cyan-700 mb-3">4.2 Propiedad Intelectual</h3>
          <p className="mb-8">
            Todo el material educativo es propiedad intelectual de los instructores y solo puede utilizarse para fines personales.
          </p>

          {/* Sección 5 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            5. Sesiones de Videollamada
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
            <li>⚙️ Nos esforzamos por ofrecer calidad constante, aunque pueden ocurrir interrupciones técnicas.</li>
            <li>🎥 Las grabaciones requieren consentimiento de todos los participantes.</li>
          </ul>

          {/* Sección 6 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            6. Pagos y Facturación
          </h2>
          <p className="mb-3">
            Los instructores establecen sus tarifas y SMARTWEB puede aplicar una comisión de intermediación.
          </p>
          <p className="mb-8">
            Las políticas de reembolso dependerán de los términos específicos de cada instructor.
          </p>

          {/* Sección 7 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            7. Privacidad y Datos
          </h2>
          <p className="mb-8">
            Tu información personal está protegida bajo nuestra{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline font-semibold">
              Política de Privacidad
            </a>
            .
          </p>

          {/* Sección 8 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            8. Limitación de Responsabilidad
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
            <li>⏸️ Interrupciones temporales del servicio</li>
            <li>📚 Contenido proporcionado por instructores</li>
            <li>💻 Fallos de dispositivos del usuario</li>
            <li>⚖️ Disputas entre usuarios</li>
          </ul>

          {/* Sección 9 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            9. Modificaciones del Servicio
          </h2>
          <p className="mb-8">
            SMARTWEB puede modificar sus servicios o políticas en cualquier momento. Los cambios serán notificados previamente.
          </p>

          {/* Sección 10 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">10. Terminación</h2>
          <p className="mb-8">
            Nos reservamos el derecho de suspender o cerrar cuentas que violen estos términos o infrinjan políticas internas.
          </p>

          {/* Sección 11 */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">11. Ley Aplicable</h2>
          <p className="mb-8">
            Este acuerdo se rige por leyes internacionales aplicables y cualquier disputa será resuelta ante tribunales competentes.
          </p>

          {/* Contacto */}
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">📞 Contacto</h3>
            <p className="text-gray-700 mb-2">
              Si tienes preguntas sobre estos Términos, puedes contactarnos en:
            </p>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>📧 legal@smartweb.edu</li>
              <li>📱 +1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Nota final */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-1">ℹ️ Nota importante:</h4>
            <p className="text-sm text-gray-600">
              En caso de discrepancia entre versiones traducidas, la versión en español prevalecerá.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pb-10">
        © {new Date().getFullYear()} SMARTWEB — Todos los derechos reservados.
      </footer>
    </div>
  )
}
