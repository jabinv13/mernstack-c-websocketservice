import { createServer } from "node:http";
import { Server } from "socket.io";
import config from "config";

const wsServer = createServer();

const ALLOWED_DOMAINS = [
  config.get("frontend.clientUI"),
  config.get("frontend.adminUI"),
];

const io = new Server(wsServer, {
  cors: { origin: ALLOWED_DOMAINS as string[] },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  //whnvr client enit join message then run the call back

  //cluent joined the room eg -room no.12
  socket.on("join", (data) => {
    socket.join(String(data.tenantId));

    console.log("this ws");

    console.log(io.of("/").adapter.rooms);

    //server to client
    socket.emit("join", { roomId: String(data.tenantId) });
  });

  console.log("first");
});

export default {
  wsServer,
  io,
};
