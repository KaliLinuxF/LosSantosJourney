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
                    console.log(item, eventName);
                    
                    if(item === eventName) {
                        console.log('Экзикут')
                        this.get(item).executeHandlers(...args);
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