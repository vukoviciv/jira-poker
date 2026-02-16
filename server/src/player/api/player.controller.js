export class PlayerController {
  #playerService;

  constructor(service) {
    this.#playerService = service;
  }

  getAll = async (_req, res) => {
    try {
      const players = await this.#playerService.getAllPlayers();
      return res.json({ data: players });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createPlayer = async ({ body }, res) => {
    try {
      const { name } = body;
      const newPlayer = await this.#playerService.createPlayer(name);
      return res.status(201).json({ data: newPlayer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  removePlayer = async({params}, res) => {
    try {
      const { id } = params;
      const removedPlayer = await this.#playerService.removePlayer(id);
      return res.json({ data: removedPlayer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PlayerController;
