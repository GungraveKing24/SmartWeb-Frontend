"use client"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      {/* 🟦 Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-16 shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">🔒 Política de Privacidad</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos y gestionamos tu información en SMARTWEB.
          </p>
        </div>
      </header>

      {/* 📜 Contenido principal */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative -mt-16">
          {/* Etiquetas informativas */}
          <div className="flex flex-wrap gap-3 justify-end mb-8">
            <span className="badge bg-blue-100 text-blue-700 border border-blue-200 text-sm">
              ⏱️ Última actualización: 15 de Marzo, 2024
            </span>
            <span className="badge bg-green-100 text-green-700 border border-green-200 text-sm">
              🛡️ Cumplimiento GDPR y Leyes Internacionales
            </span>
          </div>

          {/* 🧩 Introducción */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            1. Introducción
          </h2>
          <p className="mb-6 leading-relaxed">
            En <strong>SMARTWEB</strong> nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos,
            utilizamos y protegemos tu información personal mientras usas nuestra plataforma educativa.
          </p>

          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-indigo-700 mb-1">Transparencia</h4>
            <p className="text-gray-600 text-sm">
              Creemos en la claridad. Aquí detallamos nuestras prácticas de privacidad y tus derechos.
            </p>
          </div>

          {/* 📋 Información que Recopilamos */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mt-10 mb-4">
            2. Información que Recopilamos
          </h2>

          <h3 className="text-lg font-semibold text-cyan-700 mb-3">2.1 Información Personal</h3>
          <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th>Tipo de Información</th>
                  <th>Ejemplos</th>
                  <th>Propósito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Información de registro</td>
                  <td>Nombre, email, fecha de nacimiento</td>
                  <td>Crear y gestionar tu cuenta</td>
                </tr>
                <tr>
                  <td className="font-semibold">Información académica</td>
                  <td>Cursos, progreso, calificaciones</td>
                  <td>Proporcionar servicios educativos</td>
                </tr>
                <tr>
                  <td className="font-semibold">Datos de videollamada</td>
                  <td>Video, audio, chat durante sesiones</td>
                  <td>Facilitar clases en tiempo real</td>
                </tr>
                <tr>
                  <td className="font-semibold">Información técnica</td>
                  <td>IP, navegador, dispositivo</td>
                  <td>Mejorar seguridad y rendimiento</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-cyan-700 mb-3">2.2 Información de Instructores</h3>
          <ul className="list-disc list-inside mb-8 space-y-2 text-gray-600">
            <li>Certificaciones y cualificaciones</li>
            <li>Información bancaria para pagos</li>
            <li>Material educativo y currículum</li>
            <li>Historial de enseñanza</li>
          </ul>

          {/* ⚙️ Cómo utilizamos la información */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            3. Cómo Utilizamos tu Información
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
            <li>📚 Proveer servicios educativos personalizados</li>
            <li>🎥 Gestionar videollamadas y sesiones en vivo</li>
            <li>💳 Procesar pagos de forma segura</li>
            <li>✉️ Enviar notificaciones importantes</li>
            <li>📊 Mejorar la plataforma mediante análisis</li>
          </ul>

          {/* 🔄 Compartición */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            4. Compartición de Información
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8 text-gray-600">
            <li>👩‍🏫 Con instructores para la gestión de clases y asistencia</li>
            <li>💻 Con proveedores de servicios (GetStream, hosting, pagos)</li>
            <li>⚖️ Cuando la ley lo requiera o para proteger derechos legales</li>
          </ul>

          {/* 🧱 Seguridad */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-6">
            5. Seguridad de Datos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: "🔒", title: "Encriptación", text: "Datos encriptados en tránsito y en reposo" },
              { icon: "🛡️", title: "Autenticación", text: "Verificación de dos factores disponible" },
              { icon: "👤", title: "Acceso Controlado", text: "Solo personal autorizado accede a datos" },
              { icon: "🔄", title: "Copias de Seguridad", text: "Backups regulares y seguros" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          {/* 🧾 Derechos */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            6. Tus Derechos
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-8 text-gray-600">
            <li>📄 Acceso, rectificación y eliminación de datos</li>
            <li>📥 Portabilidad y oposición al procesamiento</li>
            <li>✉️ Contacto directo para ejercer tus derechos</li>
          </ul>

          {/* 🍪 Cookies */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            7. Cookies y Tecnologías Similares
          </h2>
          <p className="text-gray-600 mb-6">
            Usamos cookies para mantener sesiones seguras, recordar tus preferencias y mejorar tu experiencia.
          </p>

          {/* 🌍 Transferencias */}
          <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
            8. Transferencias Internacionales
          </h2>
          <p className="text-gray-600 mb-6">
            Tus datos pueden procesarse en diferentes países. Garantizamos seguridad mediante cláusulas contractuales y
            estándares internacionales.
          </p>

          {/* 📬 Contacto */}
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 p-6 rounded-xl mt-10">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">📞 Contacto y Ejercicio de Derechos</h3>
            <p className="text-gray-700 mb-2">Si tienes preguntas o deseas ejercer tus derechos:</p>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>📧 <strong>privacidad@smartweb.edu</strong></li>
              <li>📱 +1 (555) 123-4567</li>
              <li>🏢 Oficina de Protección de Datos, SMARTWEB International</li>
            </ul>
          </div>

          {/* ℹ️ Nota final */}
          <div className="bg-blue-50 border-l-4 border-blue-400 mt-8 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-1">ℹ️ Nota importante:</h4>
            <p className="text-sm text-gray-600">
              Esta política complementa nuestros <strong>Términos de Servicio</strong>. Te recomendamos leer ambos documentos
              detenidamente.
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
