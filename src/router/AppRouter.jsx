import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminHome from "../pages/admin/HomeAdmin";
import ProfesorHome from "../pages/teacher/HomeTeacher";
import UsuarioHome from "../pages/student/HomeStudent";
import GestionarCursos from "../pages/admin/GestionarCursos";

// Paginas extras
import AboutUs from "../pages/AboutUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";

import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import GestionarUsuarios from "../pages/admin/GestionarUsuarios";
import VerificarInstructores from "../pages/admin/VerfificarInstructores";
import VisualizarCursos from "../pages/teacher/Cursos";

import DescubrirCursos from "../pages/student/Discover";
import MyCourses from "../pages/student/MyCourses";
import CallPage from "../pages/CallPage";
import CreateCallPage from "../pages/teacher/CrearCall";
import ParticipantesSesion from "../pages/teacher/ParticipantesSesion";
import SesionesCurso from "../pages/SesionesCurso";
import AccountActivated from "../pages/AccountActivited";

const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = ["/login", "/register", "/cuenta-activada"].includes(location.pathname) || location.pathname.startsWith("/call/");
    const hideFooter = location.pathname.startsWith("/call/");
    return (
        <>
            {!hideNavbar && <Navbar />}
            <main className="min-h-screen">{children}</main>
            {!hideFooter && <Footer />}
        </>
    );
};

export const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cuenta-activada" element={<AccountActivated />} />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={["administrador"]}>
                                    <AdminHome />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profesor"
                            element={
                                <ProtectedRoute allowedRoles={["profesor"]}>
                                    <ProfesorHome />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/usuario"
                            element={
                                <ProtectedRoute allowedRoles={["estudiante"]}>
                                    <UsuarioHome />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/gestionar-cursos"
                            element={
                                <ProtectedRoute allowedRoles={["administrador"]}>
                                    <GestionarCursos />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/gestionar-usuarios"
                            element={
                                <ProtectedRoute allowedRoles={["administrador"]}>
                                    <GestionarUsuarios />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/verificar-instructores"
                            element={
                                <ProtectedRoute allowedRoles={["administrador"]}>
                                    <VerificarInstructores />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profesor/cursos"
                            element={
                                <ProtectedRoute allowedRoles={["profesor"]}>
                                    <VisualizarCursos />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profesor/sesion/:sesion_id/participantes"
                            element={
                                <ProtectedRoute allowedRoles={["profesor"]}>
                                    <ParticipantesSesion />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profesor/crear-link"
                            element={
                                <ProtectedRoute allowedRoles={["profesor"]}>
                                    <CreateCallPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/usuario/Discover"
                            element={
                                <ProtectedRoute allowedRoles={["estudiante"]}>
                                    <DescubrirCursos />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/usuario/miscursos"
                            element={
                                <ProtectedRoute allowedRoles={["estudiante"]}>
                                    <MyCourses />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/curso/:curso_id"
                            element={
                                <ProtectedRoute allowedRoles={["estudiante", "profesor"]}>
                                    <SesionesCurso />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/call/:callId/:cursoId"
                            element={
                                <ProtectedRoute allowedRoles={["estudiante", "profesor", "administrador"]}>
                                    <CallPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
};
