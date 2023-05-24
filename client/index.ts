import './modules/sockets';
// import './modules/raycastingTest';
import SceneHandler from './modules/SceneHandler/SceneHandler';
import { authScene } from './modules/SceneHandler/scenes/authScene';
import './modules/utils/devUtils';

require('./modules/utils/noclip');


const url = 'package://browser/index.html';
const browser = mp.browsers.new(url);

mp.events.add('playerJoin', (player: PlayerMp) => {
    mp.events.add('browserDomReady', (loadedBrowser: BrowserMp) => {
        if(browser === loadedBrowser) {
            SceneHandler.startScene(authScene);
        }
    })
});



