import Events from "../utils/Events";

let socketBrowser: BrowserMp;

mp.events.add('connectToSocket', (hash: string, url: string) => {
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
});

function connetToWebSocket(hash: string, url: string) {
    setTimeout(() => {
        socketBrowser.execute(`window.connectToSocket('${hash}', '${url}');`);
    }, 1000);
}

mp.events.add('emulCall', (eventName: string, data: any) => {
    const args = JSON.parse(data);

    if (args === null) {
      Events.call(eventName);
    } else {
      Events.call(eventName, ...args);
    }
});