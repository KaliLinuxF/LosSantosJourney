import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { StaticGenerator } from "./StaticGenerator";

BaseEventHandler.get('database:ready').addHandler(() => {
    StaticGenerator.loadExist();
});