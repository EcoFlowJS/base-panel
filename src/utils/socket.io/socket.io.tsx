import { Socket, io } from "socket.io-client";

const baseUrl = "http://localhost:4000/";

const connectSocketIO = (): Socket =>
  io(baseUrl, { path: "/socket.ecoflow" }).connect();

const disconnectSocketIO = (socket: Socket): Socket => socket.disconnect();

export { connectSocketIO, disconnectSocketIO };
