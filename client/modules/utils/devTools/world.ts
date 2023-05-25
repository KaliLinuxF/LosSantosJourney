mp.events.add('setlocaltime', (time: number) => {
    mp.game.time.setClockTime(time, 1, 1);
});