import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createServer } from "http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true, // 👈 important
    },
  });

  io.use((socket, next) => {
    try {
      // Parse cookies from handshake headers
      const cookies = cookie.parse(socket.request.headers.cookie || "");
      const token = cookies.user_secret;

      if (!token) return next(new Error("No token provided"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // store user info in socket
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.user);
  });

  const PORT = 3000;
  httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
