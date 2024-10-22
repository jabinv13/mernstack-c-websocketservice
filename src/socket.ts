import { createServer } from "node:http";
import { Server } from "socket.io";

const wsServer = createServer();

const io = new Server(wsServer, { cors: { origin: "http://localhost:5173" } });

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  //whnvr client enit join message then run the call back

  //cluent joined the room eg -room no.12
  socket.on("join", (data) => {
    socket.join(String(data.tenantId));

    //server to client
    socket.emit("join", { roomId: String(data.tenantId) });
  });
});

export default {
  wsServer,
  io,
};
