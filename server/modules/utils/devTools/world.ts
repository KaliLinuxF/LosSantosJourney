mp.events.addCommand('settime', (player: PlayerMp, fulltext: string, time: string) => {
    player.call('setlocaltime', [parseInt(time)]);
});