import { Person } from "../database/Models/Person";
import * as math from 'mathjs';

const staticStorage = new Set<string>();

export class StaticGenerator {
    static CHARACTERS_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

    static async loadExist() {
        const statics = await Person.findAll({ attributes: ['static'] });

        statics.forEach((staticId) => staticStorage.add(staticId.static));
    }

    static generateUnique() {
        let staticLength = Math.ceil(math.log(staticStorage.size + 1, this.CHARACTERS_SET.length));
        let staticId = this.generateRandom(staticLength);

        let iterationsCount = 0;

        while (staticStorage.has(staticId)) {
            staticId = this.generateRandom(staticLength);

            iterationsCount++;

            if (iterationsCount > staticStorage.size) {
                staticLength++;
                iterationsCount = 0;
            }
        }

        staticStorage.add(staticId);
        return staticId;
    }

    static generateRandom(length: number) {
        let result = '';

        for (let i = 0; i < length; i++) {
            result += this.CHARACTERS_SET.charAt(Math.floor(Math.random() * this.CHARACTERS_SET.length));
        }
    
        return result;
    }
}