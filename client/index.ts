import './modules/sockets/controller';
import './modules/utils';
import './modules/AuthService/controller';
import './modules/CharacterEditor/controller';

const url = 'package://browser/index.html';
const browser = mp.browsers.new(url);

mp.events.add('browserDomReady', (loadedBrowser: BrowserMp) => {
    if(browser === loadedBrowser) {
        mp.events.callRemote('auth:startsesstion');
    }
});

mp.keys.bind(0x76, false, () => {
    mp.gui.cursor.show(true, true);
})



