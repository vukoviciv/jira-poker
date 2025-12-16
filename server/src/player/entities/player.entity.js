export class PlayerEntity {
  constructor(id, name) {
    if (!id || !name) {
      throw new Error('PlayerEntity requires id and name');
    }
    this.id = id;
    this.name = name;
    this.joinedAt = new Date();
    this.voted = false;
    this.vote = null;
  }
}
