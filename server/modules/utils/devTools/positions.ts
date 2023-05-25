mp.events.addCommand('gomark', (player: PlayerMp, fullText: string) => {
    player.call('goToMarkk');
});

mp.events.addCommand('tpcord', (player: PlayerMp, _text: string, x: string, y: string, z: string) => {
    player.position = new mp.Vector3(parseInt(x), parseInt(y), parseInt(z));
});