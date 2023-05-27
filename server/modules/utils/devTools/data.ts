import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../position.txt');

mp.events.addCommand('getcam', (player: PlayerMp, fulltext: string) => {
    player.call('getCamPos', [fulltext]); 
});

mp.events.addCommand('getpos', (player: PlayerMp) => {
    fs.appendFileSync(filePath, `\npos: ${JSON.stringify(player.position)} heading: ${player.heading}`);
});

mp.events.add('getCamPosServer', (player: PlayerMp, name: string, json: string) => {
    fs.appendFileSync(filePath, `\n[${name}]: ${json}`);
});