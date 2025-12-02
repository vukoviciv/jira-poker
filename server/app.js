import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true 
};

const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
  cors: corsOptions,
  transports: ['websocket', 'polling']
});

app.use(cors(corsOptions));
app.use(express.json());

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
  });

  // Add your game events here
  socket.on('playerJoin', (data) => {
    console.log('Player joined:', data);
  });

  socket.on('submitVote', (data) => {
    console.log('Vote submitted:', data);
  });
});

// Register routers
app.use("/api/test", (_req, res) => res.json({ message: "test route" }));
app.get("/api/healthcheck", (_req, res) => {
  res.status(200).json({ status: "healthy" });
});

export { server };
