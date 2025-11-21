import React, { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";

import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

import { useParams } from "react-router-dom";
import "./CallPage.css";
import Logo from "../assets/logo.png";
import NotificationModal from "../components/NotificationModal";

export default function CallPage() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [notification, setNotification] = useState(null);

  const [showChat, setShowChat] = useState(false);
  const [showParticipantList, setShowParticipantList] = useState(false);

  const [showControls, setShowControls] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const [attendance, setAttendance] = useState({}); // 🔥 Registro

  const [blocked, setBlocked] = useState(false);

  const params = useParams();
  const apiKey = "fv5e9c5j23md";
  const JWT = localStorage.getItem("token");

  let payload = {};
  try {
    payload = JSON.parse(atob(JWT?.split(".")[1] || ""));
  } catch {}

  const userId = String(payload.sub || "");
  const nombre = String(payload.name || "");
  const rol = String(payload.rol || "");
  const url = import.meta.env.VITE_BACKEND_URL;

  const tokenStreamProvider = async () => {
    const response = await fetch(
      url + `/hope/joinCall?curso_id=${params.cursoId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ curso_id: params.cursoId }),
      }
    );

    if (!response.ok) throw new Error("Unauthorized");

    const data = await response.json();
    return data.getStreamToken;
  };

  /* 🟩 NAVBAR + CONTROLES dinámicos */
  useEffect(() => {
    let timeout;

    const handleMove = () => {
      setShowControls(true);
      setShowNavbar(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
        setShowNavbar(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* 🟩 Inicializar videollamada + chat */
  useEffect(() => {
    const init = async () => {
      if (!params.callId || !params.cursoId) return;

    //Logica para que el usuario no entre en la misma llamada o en otras
    const callKey = `in_call_${params.callId}`;
    const sameCall = localStorage.getItem("callStorage")

    if (sameCall) {
      if (sameCall === callKey) {
        setNotification({
          type: "error",
          message: "Tienes una llamada en otra pestaña",
        });
      } else {
        setNotification({
          type: "error",
          message: "Ya estás en otra llamada",
        });
      }

      setBlocked(true);   // 🔥 Bloquea el render y evita loading infinito
      return;
    }
    //--------------------------------------------------------------------------------------
      const user = {
        id: userId,
        name: nombre,
        image: `https://getstream.io/random_png/?id=${userId}`,
      };

      try {
        const token = await tokenStreamProvider();

        const videoClient = new StreamVideoClient({ apiKey, user, token });
        setClient(videoClient);

        const callInstance = videoClient.call("default", params.callId);
        await callInstance.join({ create: false });
        setCall(callInstance);

        /* 🔥 Registrar entrada del usuario */
        setAttendance((prev) => ({
          ...prev,
          [userId]: {
            name: nombre,
            user_id: userId,
            entrada: new Date().toLocaleString(),
            salida: "",
          },
        }));

        /* Detectar cuando alguien entra o sale */
        callInstance.on("participantJoined", (e) => {
          const p = e.participant || e.user;
          if (!p) return;

          setAttendance((prev) => ({
            ...prev,
            [p.userId]: {
              name: p.name || "Usuario",
              user_id: p.userId,
              entrada: new Date().toLocaleString(),
              salida: "",
            },
          }));
        });

        callInstance.on("participantLeft", (e) => {
          const p = e.participant || e.user;
          if (!p) return;

          setAttendance((prev) => ({
            ...prev,
            [p.userId]: {
              ...prev[p.userId],
              salida: new Date().toLocaleString(),
            },
          }));
        });

        const chat = StreamChat.getInstance(apiKey);
        await chat.connectUser(user, token);

        const ch = chat.channel("messaging", params.callId, {
          members: [{ user_id: userId }],
        });
        await ch.watch();

        setChatClient(chat);
        setChannel(ch);

        localStorage.setItem("callStorage",`in_call_${params.callId}`)
      } catch (err) {
        setNotification({
          type: "error",
          message: "Error al conectar a la llamada",
        });
        console.log(err)
      }
    };

    init();

    return () => {
      client?.disconnectUser?.();
      chatClient?.disconnectUser?.();
    };
  }, []);

  /* 🟩 Descargar asistencia */
  const downloadAttendance = () => {
    const registros = Object.values(attendance);

    let csv = "Nombre,ID Usuario,Hora Entrada,Hora Salida\n";

    registros.forEach((p) => {
      csv += `"${p.name}",${p.user_id},"${p.entrada}","${p.salida}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const urlCSV = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urlCSV;
    link.download = `asistencia_${params.callId}.csv`;
    link.click();

    URL.revokeObjectURL(urlCSV);
  };

  if (blocked)
    return (
    <>
      <NotificationModal
        isOpen={true}
        type="error"
        message="No puedes unirte porque ya estás en otra llamada."
        onClose={() => (window.location.href = "/")}
      />
    </>
  );

  if (!client || !call || !chatClient || !channel)
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="meeting-container">

            {/* NAVBAR SUPERIOR */}
            <header className={`meeting-header ${showNavbar ? "show" : "hide"}`}>
              <div className="meeting-info">
                <img src={Logo} className="meeting-logo" />
                <h2 className="meeting-title">SMARTWEB Meet</h2>
              </div>

              <div className="meeting-actions">
                <button onClick={() => setShowChat(!showChat)}>💬</button>

                {rol === "Profesor" && (
                  <>
                    <button onClick={() => setShowParticipantList(!showParticipantList)}>👥</button>

                    {/* 🔥 Botón de descargar asistencia */}
                    <button onClick={downloadAttendance}>📥</button>
                  </>
                )}

                <button
                  className="exit-btn"
                  onClick={() => {
                    call.leave();
                    localStorage.removeItem("callStorage");
                    window.location.href = "/";
                  }}
                >
                  ⬅ Salir
                </button>
              </div>
            </header>

            {/* VIDEO */}
            <main className="sw-video-area">
              <SpeakerLayout />
            </main>

            {/* CONTROLES */}
            <footer className={`sw-controls ${showControls ? "show" : "hide"}`}>
              <CallControls
                onLeave={() => {
                  call.leave();
                  localStorage.removeItem("callStorage");
                  window.location.href = "/";
                }}
                // BOTONES DE LA LLAMADA NO BUGS
                overrides={{
                  RecordCallButton: () => null,
                  StartRecordingButton: () => null,
                  StopRecordingButton: () => null,
                  RecordingButton: () => null,
                  ToggleScreenShareButton: () => null,
                }}
              />
            </footer>

            {/* CHAT */}
            {showChat && (
              <div className="floating-chat animate-fade">
                <div className="floating-chat-header">
                  <span>Chat del curso</span>
                  <button onClick={() => setShowChat(false)}>✕</button>
                </div>

                <div className="floating-chat-body">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                      <Window>
                        <MessageList />
                        <MessageInput />
                      </Window>
                    </Channel>
                  </Chat>
                </div>
              </div>
            )}

            {/* PARTICIPANTES */}
            {showParticipantList && (
              <div className="floating-chat animate-fade">
                <div className="floating-chat-header">
                  <span>Participantes</span>
                  <button onClick={() => setShowParticipantList(false)}>✕</button>
                </div>

                <div className="floating-chat-body">
                  <CallParticipantsList />
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICACIÓN */}
          {notification && (
            <NotificationModal
              isOpen={true}
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
// Falta ver llamada grupa
