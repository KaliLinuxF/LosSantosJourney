export default interface ISceneCamera {
    start(interpCamera?: CameraMp): void;

    stop(): void;

    getActiveCamera(): CameraMp;
}

