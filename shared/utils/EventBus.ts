export type HookHandler<T> = (...args: any) => T;

interface Hook<T> {
  handler: HookHandler<T>,
  priority: number
}

export class EventBus {
  private eventsHandlers = new Map<string, Hook<any>[]>();
  private asyncEventsHandlers = new Map<string, Hook<any>[]>();

  constructor() { }

  /**
   * Проходится по обработчикам хука (ТОЛЬКО ПО СИНХРОННЫМ ОБРАБОТЧИКАМ) и вызывает их в порядке регистрации
   * @param name Уникальное имя хука
   * @param args Аргументы, передаваемые в хэндлеры
   * @return T[] Исключает из результатов обработчиков null и undefined объекты
   */
  call<T>(name: string, ...args: any): T[] {
    try {
      const hookHandlers = this.eventsHandlers.get(name);
      if (hookHandlers) {
        return hookHandlers.map(hook => hook.handler(...args))
            .filter(result => result != null);
      }

      return [];
    } catch (e) {
      console.error('EventBus error: ', e);
      return [];
    }
  }

  /**
   * Асинхронно проходится по обработчикам хука (ТОЛЬКО ПО АСИНХРОННЫМ ОБРАБОТЧИКАМ) и вызывает их в порядке регистрации
   * @param name Уникальное имя хука
   * @param args Аргументы, передаваемые в хэндлеры
   * @return Promise<T[]> Исключает из результатов обработчиков null и undefined объекты
   */
  async callAsync<T>(name: string, ...args: any): Promise<T[]> {
    try {
      const hookHandlers = this.asyncEventsHandlers.get(name);
      if (hookHandlers) {
        return (await Promise.all(hookHandlers.map(hook => hook.handler(...args))))
            .filter(result => result != null);
      }

      return [];
    } catch (e) {
      console.error('EventBus error callAsync: ', e);
    }
  }

  /**
   * Регистрирует обработчик хука.
   * Важный момент - если обработчик является членом класса, то он должен объявляться в классе как
   * поле/свойство с лямбдой функцией, а не как метод (т.е #handleSmth = () => {} ) для возможности
   * удалить обработчик в дальнейшем
   *
   * priority - обработчик с меньшим приоритетом выполняется первее
   */
  register<T>(name: string, handler: HookHandler<T>, priority: number = 100) {
    if (this.eventsHandlers.has(name)) {
      this.eventsHandlers.get(name).push({ handler, priority });
      const hooks = this.eventsHandlers.get(name);
      this.eventsHandlers.set(name, hooks.sort((a, b) => a.priority - b.priority))
    } else {
      this.eventsHandlers.set(name, [{ handler, priority }]);
    }

  }

  registerAsync<T>(name: string, handler: HookHandler<T>, priority: number = 100) {
    if (this.asyncEventsHandlers.has(name)) {
      this.asyncEventsHandlers.get(name).push({ handler, priority });
      const hooks = this.asyncEventsHandlers.get(name);
      this.asyncEventsHandlers.set(name, hooks.sort((a, b) => a.priority - b.priority))
    } else {
      this.asyncEventsHandlers.set(name, [{ handler, priority }]);
    }
  }

  /**
   * Удаляет обработчик из пула обработчиков хука
   */
  unregister(name: string, handler: HookHandler<any>) {
    if (this.eventsHandlers.has(name)) {
      const handlers = this.eventsHandlers.get(name);
      const idx = handlers.findIndex(hook => hook.handler === handler);
      if (idx === -1) {
        return;
      }

      handlers.splice(idx, 1);
    }

    if (this.asyncEventsHandlers.has(name)) {
      const handlers = this.asyncEventsHandlers.get(name);
      const idx = handlers.findIndex(hook => hook.handler === handler);
      if (idx === -1) {
        return;
      }

      handlers.splice(idx, 1);
    }
  }
}