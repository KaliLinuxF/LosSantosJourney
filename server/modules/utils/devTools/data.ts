import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../position.txt');

mp.events.addCommand('getcam', (player: PlayerMp, fulltext: string) => {
    player.call('getCamPos', [fulltext]); 
});

mp.events.addCommand('getpos', (player: PlayerMp, fulltext: string) => {
    const { x, y, z } = player.position;

    fs.appendFileSync(filePath, `\n[POS ${fulltext}]: new mp.Vector3(${x}, ${y}, ${z}), heading: ${player.heading}`);
});

mp.events.add('getCamPosServer', (player: PlayerMp, name: string, json: string) => {
    const data: {position: Vector3Mp, rotation: Vector3Mp } = JSON.parse(json);
    const { x: posX, y: posY, z: posZ } = data.position;
    const { x: rotX, y: rotY, z: rotZ } = data.rotation;

    fs.appendFileSync(filePath, `\n[CAM ${name}]: POSITION - new mp.Vector3(${posX}, ${posY}, ${posZ}), ROTATION - new mp.Vector3(${rotX}, ${rotY}, ${rotZ})`);
});