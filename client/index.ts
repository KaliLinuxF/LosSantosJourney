import './modules/sockets/controller';
// import './modules/raycastingTest';
import SceneHandler from './modules/SceneHandler/SceneHandler';
import { authScene } from './modules/SceneHandler/scenes/authScene';
import './modules/utils';

const url = 'package://browser/index.html';
const browser = mp.browsers.new(url);

mp.events.add('browserDomReady', (loadedBrowser: BrowserMp) => {
    if(loadedBrowser === browser) {
        setTimeout(() => {
            SceneHandler.startScene(authScene);
        }, 1000);
    }
});

mp.keys.bind(0x76, false, () => {
    mp.gui.cursor.show(true, true);
})



