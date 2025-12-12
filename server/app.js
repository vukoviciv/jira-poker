import express from 'express';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true 
};

export function createApp(gameContext) {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  const playerModule = gameContext.getModule('player');

  app.use('/api/player', playerModule.router);
  app.get('/api/healthcheck', (_req, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  return app;
}
