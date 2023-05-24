let arr_en: string[] = null;
let shuffleArr: string[] = null;

const cryptEvent = (eventName: string) => {
    let result = ''
    for (let i = 0; i < eventName.length; i++) {
        let index = arr_en.findIndex(x => x == eventName[i])
        result += shuffleArr[index]
    }

    return result
}

mp.events.add('changeArrs', (_arrEn: string[], _shuffleArr: string[]) => {
    arr_en = _arrEn;
    shuffleArr = _shuffleArr;
});

const __callRemote = mp.events.callRemote;
mp.events.callRemote = (eventName, ...args) => {
    try {
        if (shuffleArr == null) {
            __callRemote(eventName, ...args);
            return;
        }
    
        const hash = cryptEvent(eventName);
       
        __callRemote('FYOUWL0V3', hash, ...args);
    } catch (error) {
        mp.console.logInfo('EVENT ERROR ' + error, true, false)
    }
}

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