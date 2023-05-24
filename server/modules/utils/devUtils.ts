import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../position.txt');
console.log(filePath)

mp.events.addCommand('getcam', (player: PlayerMp, fulltext: string) => {
    player.call('getCamPos', [fulltext]); 
});

mp.events.add('getCamPosServer', (player: PlayerMp, name: string, json: string) => {
    fs.appendFileSync(filePath, `\n[${name}]: ${json}`);
});

mp.events.addCommand('getpos', (player: PlayerMp) => {
    fs.appendFileSync(filePath, `\npos: ${JSON.stringify(player.position)} heading: ${player.heading}`);
});

mp.events.addCommand('tpcord', (player: PlayerMp, _text: string, x: string, y: string, z: string) => {
    player.position = new mp.Vector3(parseInt(x), parseInt(y), parseInt(z));
});

mp.events.addCommand('settime', (player: PlayerMp, fulltext: string, time: string) => {
    player.call('setlocaltime', [parseInt(time)]);
});