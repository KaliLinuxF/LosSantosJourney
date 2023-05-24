export default abstract class SceneElement {
    public abstract onLoad(): void;

    public abstract destroy(): void;

    public abstract create(dimension: number): void;

    public abstract isLoaded(): boolean;
}