let player = mp.players.local;

let ped1 = mp.peds.new(mp.game.joaat('u_m_y_abner'), player.position, 34, 0);
let ped2 = mp.peds.new(mp.game.joaat('u_m_y_abner'), new mp.Vector3(player.position.x + 2, player.position.y, player.position.z), 34, 0);

ped1.setAlpha(100, false);
ped2.setAlpha(100, false);

let camera = mp.cameras.new("gameplay");
let distance = 15;

mp.keys.bind(0x76, false, () => {
    mp.gui.cursor.show(true, true);
})

setTimeout(() => {
    mp.console.logInfo(`ped handle ${ped1.handle}`, true, true);
    mp.console.logInfo(JSON.stringify(player.position), true, true);
}, 3000);

let drawToEntity: EntityMp = null;

mp.events.add('render', () => {
    if(drawToEntity == null) {
        return;
    }

    if(ped1.handle === drawToEntity.handle) {
        ped1.setAlpha(255, false);
        ped2.setAlpha(100, false);
    } else if(ped2.handle === drawToEntity.handle) {
        ped2.setAlpha(255, false);
        ped1.setAlpha(100, false);
    }

    mp.game.graphics.drawLine(player.position.x, player.position.y, player.position.z, drawToEntity.position.x, drawToEntity.position.y, drawToEntity.position.z, 255, 255, 255, 255); 
});

mp.events.add('render', () => {
    const coursor = mp.gui.cursor.position;
    const coursourCord = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(coursor[0], coursor[1], 0));
    const raycast = mp.raycasting.testPointToPoint(camera.getCoord(), new mp.Vector3(coursourCord.x, coursourCord.y, coursourCord.z), player, 8 | 4) 

    if(raycast && raycast?.entity && (raycast.entity as EntityMp)?.position) {
        mp.game.graphics.notify(`entity: ${raycast?.entity}, ped: ${ped1.handle}, ped2 ${ped2.handle}`);
        drawToEntity = (raycast.entity as EntityMp);
    }
})

