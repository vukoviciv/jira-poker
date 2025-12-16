export class PlayerEntity {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.joinedAt = new Date();
    this.voted = false;
    this.vote = null;
  }
}
