export type PlayerControllerOptions = { 
    animation?: {
        positionIdx: number,
        dict: string, 
        name: string 
    }
};

type PlayerControllerCurrentAnim = {
    dict: string, 
    name: string 
}

export type PlayerControllerPosition = {
    position: Vector3Mp;
    heading: number;
}

export class PlayerController {
    private readonly player: PlayerMp;
    private readonly positions: PlayerControllerPosition[];
    private readonly options: PlayerControllerOptions;
    private currentAnim: PlayerControllerCurrentAnim;

    constructor(positions: PlayerControllerPosition[], options?: PlayerControllerOptions) {
        this.player = mp.players.local;
        this.positions = positions;
        this.options = options;
    }

    async changePosition(positionIdx: number) {
        const position = this.positions[positionIdx];
        
        if(!position) {
            return;
        }

       await this.destroyAnim();
        
        this.player.position = position.position;
        this.player.setHeading(position.heading);

        if(this.options) {
            if(this.options.animation) {
                mp.game.streaming.requestAnimDict(this.options.animation.dict);

                while (!mp.game.streaming.hasAnimDictLoaded(this.options.animation.dict)) {
                    mp.game.streaming.requestAnimDict(this.options.animation.dict);
                    await mp.game.waitAsync(10);
                }

                if (!mp.players.exists(this.player)) {
                    return;
                }

                this.player.taskPlayAnim(this.options.animation.dict, this.options.animation.name, 8.0, 1.0, -1, 1, 1.0, false, false, false);
                this.currentAnim = { dict: this.options.animation.dict, name: this.options.animation.name }
            }
        }
    }

    async destroyAnim() {
        if(this.currentAnim) {
            do {
                this.player.stopAnimTask(this.options.animation.dict, this.options.animation.name, 3.0);
                await mp.game.waitAsync(10);
            } while (!this.player.hasAnimFinished(this.options.animation.dict, this.options.animation.name, 3.0));
            
            this.currentAnim = null;
        }
    }

    destroy() {
        this.destroyAnim();
    }
}