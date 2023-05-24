export type handlerFunction = (...args: any) => void;
type handlerWithPriority = { handler: handlerFunction, priority: number };

export class BaseEvent {
    private readonly _eventName: string;
    private readonly handlers: handlerWithPriority[];

    constructor(eventName: string) {
        this._eventName = eventName;
        this.handlers = [];
    }

    get eventName(): string {
        return this._eventName;
    }
    
    addHandler(handler: handlerFunction, priority: number) {
        if(this.handlers.find((item) => item.handler === handler)) {
            return;
        }

        this.handlers.push({ handler, priority });
        this.handlers.sort((a, b) => b.priority - a.priority);
    }

    executeHandlers(...args: any[]) {
        this.handlers.forEach(({ handler }) => {
            handler(...args);
        });
    }
}