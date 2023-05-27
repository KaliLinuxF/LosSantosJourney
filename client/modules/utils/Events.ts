const _callRemote = mp.events.callRemote;
mp.events.callRemote = null;

const _callLocal = mp.events.call;
mp.events.call = null;

const _callRemoteUnreliable = mp.events.callRemoteUnreliable;
mp.events.callRemoteUnreliable = null;

export default class Events {
    static callRemote(eventName: string, ...args: any[]) {
        try {
            _callRemote(eventName, ...args);
        } catch (error) {
            mp.console.logInfo('EVENT ERROR ' + error, true, false)
        }
      
    }

    static call(eventName: string, ...args: any[]) {
        try {
            _callLocal(eventName, ...args);
        } catch (error) {
            mp.console.logInfo('EVENT ERROR ' + error, true, false)
        }
    }

    static callRemoteUnreliable(eventName: string, ...args: any[]) {
        try {
            _callRemoteUnreliable(eventName, ...args);
        } catch (error) {
            mp.console.logInfo('EVENT ERROR ' + error, true, false)
        }
    }
}