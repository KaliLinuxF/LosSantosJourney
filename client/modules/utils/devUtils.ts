mp.events.add('goToMark', () => {
    if (mp.game.invoke('0x1DD1F58F493F1DA5')) {
        const blipId = mp.game.invoke('0x1BEDE233E6CD2A1F', 8);

        if (blipId === null) {
            return;
        }

        const blipPosition = mp.game.ui.getBlipInfoIdCoord(blipId);

        if (!blipPosition)
            return;

        blipPosition.z = 40;

        mp.players.local.position = blipPosition;

        setTimeout(() => {
            blipPosition.z = mp.game.gameplay.getGroundZFor3dCoord(blipPosition.x, blipPosition.y, 500, true, false);
            mp.players.local.position = blipPosition;
        }, 400);
    }
});

mp.events.add('setlocaltime', (time: number) => {
    mp.game.time.setClockTime(time, 1, 1);
});