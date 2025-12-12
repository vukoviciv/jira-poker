export class GameContext {
  constructor() {
    this.modules = new Map();
    this.services = new Map();
    this.moduleDefinitions = new Map();
  }

  loadModule(name, moduleDefinition) {
    const result = moduleDefinition.load(this);
    this.modules.set(name, result);
    this.moduleDefinitions.set(name, moduleDefinition);

    return result;
  }

  async initializeModulesWithIo(io) {
    for (const [name, moduleDefinition] of this.moduleDefinitions) {
      const moduleData = this.modules.get(name);
      if (moduleDefinition?.afterStart) {
        await moduleDefinition.afterStart(moduleData, io);
      } else {
        console.log(`No afterStart method for ${name}`);
      }
    }
  }

  getModule(name) {
    return this.modules.get(name);
  }

  registerService(key, service) {
    this.services.set(key, service);
  }

  getService(key) {
    return this.services.get(key);
  }
}
