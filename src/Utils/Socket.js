import io from "socket.io-client";

let socket = null;

export function initializeSocket(user) {
  if (!socket) {
    socket = io("http://localhost:8000");
    socket.connect();
  }

  if (user) {
    socket.emit("join", user?._id);
  }
}

export function getSocket() {
  return socket;
}
