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
  ChannelHeader,
} from "stream-chat-react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import "./CallPage.css"

export default function CallPage() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showParticipantList, setShowParticipantList] = useState(false)
  const params = useParams()

  const apiKey = "fv5e9c5j23md";

  const JWT = localStorage.getItem("token");
  const payload = JSON.parse(atob(JWT.split(".")[1]));
  const userId = String(payload.sub); // 👈 fuerza a string
  const nombre = String(payload.name); // 👈 fuerza a string
  const rol = String(payload.rol)
  const url = import.meta.env.BACKEND_URL

const tokenStreamProvider = async () => {
  const response = await fetch(url + `/hope/joinCall?curso_id=${params.cursoId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ curso_id: params.cursoId }),
  });

  if (!response.ok) {
    alert("No tienes los permisos para entrar a esta llamada");
    throw new Error("Unauthorized");
  }

  const data = await response.json();
  return data.getStreamToken;
};

useEffect(() => {
  const userGetStream = {
    id: userId,
    name: nombre,
    image: `https://getstream.io/random_png/?id=guest&name=${nombre}`,
  };

  const init = async () => {
    if (!params.callId || !params.cursoId) {
      alert("No se proporcionó la información necesaria en la URL");
      return;
    }

    try {
      // 1️⃣ Esperar el token antes de inicializar el cliente
      const getStreamToken = await tokenStreamProvider();
      console.log("✅ Token GetStream obtenido:", getStreamToken);

      // 2️⃣ Inicializar cliente de video
      const videoClient = new StreamVideoClient({
        apiKey,
        user: userGetStream,
        token: getStreamToken,
      });
      setClient(videoClient);

      const call = videoClient.call("default", params.callId);
      await call.join({ create: false });
      setCall(call);

      // 3️⃣ Inicializar cliente de chat
      const chat = StreamChat.getInstance(apiKey);
      await chat.connectUser(userGetStream, getStreamToken);

      const chatChannel = chat.channel("messaging", params.callId, {
        name: `Chat del curso: ${params.callId}`,
        members: [{
            user_id: userId
          }],
      });

      await chatChannel.watch();
      setChatClient(chat);
      setChannel(chatChannel);
      console.log(chatChannel)
    } catch (error) {
      console.error("❌ Error al inicializar la llamada:", error);
      alert("No se pudo conectar a la llamada. Verifica tu token o permisos.");
    }
  };

  init();

  // 🧹 Limpiar conexiones al salir
  return () => {
    client?.disconnectUser?.();
    chatClient?.disconnectUser?.();
  };
}, []);

  if (!client || !call || !chatClient || !channel)
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p className="loading-text">Conectando a la llamada...</p>
      </div>
    );

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="meeting-container">
            {/* Header */}
            <header className="meeting-header">
              <div className="meeting-info">
                <img src="../assets/logo.png" alt="Logo" className="meeting-logo" />
                <h2 className="meeting-title">SMARTWEB Meet</h2>
              </div>
              <div className="meeting-actions">
                <button
                  className="chat-toggle-btn"
                  onClick={() => setShowChat(!showChat)}
                >
                  <i className="fas fa-comments"></i>
                </button>
                {(rol == "Profesor") &&
                  <button
                    className="chat-toggle-btn"
                    onClick={() => setShowParticipantList(!showParticipantList)}
                  >
                    👥
                  </button>
                }
                <button
                  className="exit-btn"
                  onClick={() => {
                    call.leave();
                    window.location.href = "/";
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i> Salir
                </button>
              </div>
            </header>

            {/* Video a pantalla completa */}
            <main className="meeting-video">
              <SpeakerLayout />
            </main>

            {/* Controles */}
            <footer className="meeting-footer">
              <CallControls />
            </footer>

            {/* Chat flotante encima */}
            {showChat && (
              <div className="floating-chat">
                <div className="floating-chat-header">
                  <span>Chat del curso</span>
                  <button
                    className="close-chat-btn"
                    onClick={() => setShowChat(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="floating-chat-body">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                      <Window>
                        <MessageList />
                        <MessageInput placeholder="Escribe un mensaje..." />
                      </Window>
                    </Channel>
                  </Chat>
                </div>
              </div>
            )}

            {/* Listado de participante flotante encima */}
            {showParticipantList && (
              <div className="floating-chat">
                <div className="floating-chat-header">
                  <span>Lista de participantes</span>
                  <button
                    className="close-chat-btn"
                    onClick={() => setShowParticipantList(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="floating-chat-body">
                  <CallParticipantsList />
                </div>
              </div>
            )}
          </div>
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
