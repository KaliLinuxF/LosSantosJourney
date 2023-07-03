export type PlayerControllerPosition = {
    position: Vector3Mp;
    heading: number;
}

export class PlayerController {
    private readonly player: PlayerMp;
    private readonly positions: PlayerControllerPosition[];

    constructor(positions: PlayerControllerPosition[]) {
        this.player = mp.players.local;
        this.positions = positions;
    }

    async changePosition(positionIdx: number) {
        const position = this.positions[positionIdx];
        
        if(!position) {
            return;
        }
       
        this.player.position = position.position;
        this.player.setHeading(position.heading);
    }
}