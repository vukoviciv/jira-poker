export class GameContext {
  constructor() {
    this.loadedModules = new Map();
    this.services = new Map();
    this.moduleDefinitions = new Map();
  }

  loadModule(name, moduleDefinition) {
    const moduleExports = moduleDefinition.load(this);
    this.loadedModules.set(name, moduleExports);
    this.moduleDefinitions.set(name, moduleDefinition);

    return moduleExports;
  }

  async initializeModulesWithIo(io) {
    for (const [name, moduleDefinition] of this.moduleDefinitions) {
      const moduleData = this.loadedModules.get(name);
      if (moduleDefinition?.afterStart) {
        await moduleDefinition.afterStart(moduleData, io);
      } else {
        throw new Error(`Module ${name} is missing afterStart method`);
      }
    }
  }

  getModule(name) {
    return this.loadedModules.get(name);
  }

  registerService(key, service) {
    this.services.set(key, service);
  }

  getService(key) {
    return this.services.get(key);
  }
}
