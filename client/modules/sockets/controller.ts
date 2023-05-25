import Events from "../utils/Events";
import { BaseEventHandler } from '../../../shared/BaseEvents/BaseEventHandler';

let socketBrowser: BrowserMp;

BaseEventHandler.get('connectToSocket').addHandler((hash: string, url: string) => {
    if(socketBrowser === undefined) {
        socketBrowser = mp.browsers.new(url);

        mp.events.add('browserDomReady', (browser: BrowserMp) => {
            if(browser === socketBrowser) {
                connetToWebSocket(hash, url);
            }
        });
        return;
    }

    connetToWebSocket(hash, url);
}, 0);

BaseEventHandler.get('emulCall').addHandler((eventName: string, data: any) => {
    const args = JSON.parse(data);

    if (args === null) {
      Events.call(eventName);
    } else {
      Events.call(eventName, ...args);
    }
}, 0)

function connetToWebSocket(hash: string, url: string) {
    setTimeout(() => {
        socketBrowser.execute(`window.connectToSocket('${hash}', '${url}');`);
    }, 1000);
}