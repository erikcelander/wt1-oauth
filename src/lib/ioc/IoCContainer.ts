export class IoCContainer {
  #services: Map<string, any>;
  #singletons: Map<string, any>;

  constructor() {
    this.#services = new Map();
    this.#singletons = new Map();
  }

  register(
    name: string,
    definition: any,
    options: { dependencies?: string[]; singleton?: boolean; type?: boolean } = {}
  ) {
    this.#services.set(name, {
      definition,
      dependencies: options.dependencies,
      singleton: !!options.singleton,
      type: !!options.type
    });
  }

  resolve(name: string): any {
    const service = this.#services.get(name);

    if (typeof service.definition !== 'function' || service.type) {
      return service.definition;
    }

    if (!service.singleton) {
      return this.#createInstance(service);
    }

    if (!this.#singletons.has(name)) {
      const instance = this.#createInstance(service);
      this.#singletons.set(name, instance);
    }
    return this.#singletons.get(name);
  }

  #createInstance(service: any) {
    const args =
      service.dependencies?.map((dependency: any) => this.resolve(dependency)) || [];
    return new service.definition(...args);
  }
}