import { io, Socket } from "socket.io-client";
import { refreshToken } from "../api/refresh-controller";

let socket: Socket | null = null;
let connecting: Socket | null = null;


export function connectWS(): Socket {
  if (socket?.connected) return socket; 
  if (connecting) return connecting;

  connecting = io(import.meta.env.VITE_SERVER_URL, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity, 
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    autoConnect: false,
  });

  socket = connecting;

  socket.on('connect', () => { connecting = null; });

  socket.on('reconnect_attempt', async () => {
    try {
       await refreshToken();
    } catch {
      socket?.disconnect();
      window.location.href = '/login';
    }
  });

    // ── Server kicked (blocked / logged out)
  socket.on('disconnect', (reason:string) => {
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
  connecting = null;
}

