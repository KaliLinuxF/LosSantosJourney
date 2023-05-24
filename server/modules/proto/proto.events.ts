type PoolOfEvents = { [name: string]: (...args: any[]) => void; }

import { invokeHook } from "../../../shared/utils/hooks";

const SERVER_SHIT = 'alsdpKIJ@#@*#j';

const BASE_EVENT_NAME = 'FYOUWL0V3';
const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',':','_','-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

mp.events.add('playerJoin', (player: PlayerMp) => {
    setTimeout(() => {
        if (!mp.players.exists(player)) {
            return;
        }

        player.tempValues.shuffleArray = generateShuffleArray();
        player.call('changeArrs', [arr_en, player.tempValues.shuffleArray]);
    }, 5000);
});

setTimeout(() => {
    console.log('[SHUFFLE]: Shuffle start');
    for (let player of mp.players.toArray()) {
        // TODO: Add is player logged

        player.tempValues.shuffleTimestamp = Date.now();
        player.tempValues.shuffleArrayOld = player.tempValues.shuffleArray;
        player.tempValues.shuffleArray = generateShuffleArray();
        player.call('changeArrs', [arr_en, player.tempValues.shuffleArray]);
    }
    console.log('[SHUFFLE]: Shuffle finish');
}, 20 * 60 * 1000);

function generateShuffleArray(): string[] {
    return [...arr_en].sort((a, b) => 0.5 - Math.random());
}

function deCryptEvent(hashedEventName: string, shuffleArr: string[]) {
    let result = ''
    for (let i = 0; i < hashedEventName.length; i++) {
        let index = shuffleArr.findIndex(x => x == hashedEventName[i])
        result += arr_en[index]
    }
    return result
}

mp.events.add(BASE_EVENT_NAME, (player: PlayerMp, hashedEventName: string, ...args: any[]) => {
    if (player.tempValues.shuffleArrayOld && Date.now() - player.tempValues.shuffleTimestamp < 3 * 1000) {
        mp.events.call(deCryptEvent(hashedEventName, player.tempValues.shuffleArrayOld), BASE_EVENT_NAME, player, ...args);
    }

    const eventName = deCryptEvent(hashedEventName, player.tempValues.shuffleArray);
    mp.events.call(eventName, BASE_EVENT_NAME, player, ...args);
});

// @ts-ignore
mp.events.__call__ = mp.events.call;
mp.events.call = function (eventName: string, ...args: any) {
    invokeHook(eventName, ...args);
    // @ts-ignore
    mp.events.__call__(eventName, SERVER_SHIT, ...args)
}

//@ts-ignore
mp.events.__add__ = mp.events.add;
//@ts-ignore
mp.events.add = function (eventName: string | PoolOfEvents, callback: (...args: any[]) => void): void {
    if(typeof eventName !== 'string') {
        for (const item of Object.keys(eventName)) {
            mp.events.add(item, eventName[item]);
        }
    } else {
        // Midleware
        const proxy = new Proxy(callback, {
           apply: (target, context, args) => {
                try {
                    if(args[0] === SERVER_SHIT) {
                        args.splice(0, 1);

                        if(args[0] === BASE_EVENT_NAME) {
                            args.splice(0, 1);
                        }
                    }
                    target.apply(context, args);
                    return true;
                } catch (error) {
                    console.log([`[PROTO.EVENTS]: Proxy error at ${eventName}, ${error}\nArguments: ${args.slice(1)}`]);
                }
           }
        })

        //@ts-ignore
        mp.events.__add__(eventName, proxy);
    }
}