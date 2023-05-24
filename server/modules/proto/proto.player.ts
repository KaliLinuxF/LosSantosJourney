const {call} = mp.Player.prototype

mp.Player.prototype.call = function (...args: any[]): void {
    try {
        if (!mp.players.exists(this)) {
            return;
        }

        if (args[1] != null) {
            for (let arg of args[1]) {
                if (arg != null && arg.getVariable) {
                    return call.apply(this, args);
                }
            }
        }

        if (this.socketWeb == null) {
            call.apply(this, args)
        } else {
            this.socketWeb.timeout(30000).emit('emulCall', args[0], args[1]);
        }
    } catch (err) {
        console.log(err)
    }
}