import { io, Socket } from "socket.io-client";
import { refreshToken } from "../api/refresh-controller";

let socket: Socket | null = null;


export function connectWS(): Socket {
  if (socket?.connected) return socket; 

  socket = io(import.meta.env.VITE_SERVER_URL, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity, 
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    autoConnect: false,
  });

  
 // ── Before each reconnect attempt, refresh the token first
    socket.on('reconnect_attempt', async () => {
    try {
       await refreshToken();
    } catch {
      socket?.disconnect();
      window.location.href = '/login';
    }
  });

    // ── Server kicked (blocked / logged out)
  socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
      window.location.href = '/login';
    }
  });

  socket.connect();

  return socket;
}

export function disconnectWS(): void {
  socket?.disconnect();
  socket = null;
}

