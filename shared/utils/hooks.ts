import {EventBus, HookHandler} from "./EventBus";

const globalBus = new EventBus();

export function invokeHook<T>(name: string, ...args: any[]) { return globalBus.call<T>(name, ...args); }
export function registerHookHandler<T>(name: string, handler: HookHandler<T>, priority = 100) { globalBus.register(name, handler, priority); }
export function unregisterHookHandler<T>(name: string, handler: HookHandler<T>) { globalBus.unregister(name, handler); }
