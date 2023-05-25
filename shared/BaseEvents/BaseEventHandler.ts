import { BaseEvent, handlerFunction } from "./BaseEvent";

const baseEventStorage = new Map<string, BaseEvent>();

export class BaseEventHandler {
    static unregisterEvent(eventName: string) {
        if(!baseEventStorage.has(eventName)) {
            return;
        }

        baseEventStorage.delete(eventName);
    }

    static get(eventName: string) {
        if(!baseEventStorage.has(eventName)) {
            const baseEvent = new BaseEvent(eventName);
            baseEventStorage.set(eventName, baseEvent);

            mp.events.add(eventName, (...args) => {
                this.getAllEvents().forEach((item) => {
                    if(item === eventName) {
                        const baseEvent = this.get(item);

                        if(!baseEvent) {
                            throw new Error('[BaseEvents]: BaseEvent undefined');
                        }

                        baseEvent.executeHandlers(...args);
                    }
                });
            })
        }

        return baseEventStorage.get(eventName);
    }

    static getAllEvents() {
        return [...baseEventStorage.keys()];
    }
}