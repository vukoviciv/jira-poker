import express from 'express';
import cors from 'cors';
import playerRouter from './src/player/api/player.router.js';

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true 
};

export function createApp(gameContext) {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use('/api/player', playerRouter(gameContext));
  app.use('/api/test', (_req, res) => res.json({ message: 'test route' }));
  app.get('/api/healthcheck', (_req, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  return app;
}
