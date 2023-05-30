
import { Person } from "./Person";
import { PersonData } from "./PersonData";

const personStorage = new Map<number, Person>();

export class PersonHandler {
    static create(id: number, player: PlayerMp, data: PersonData) {
        const person = new Person(id, player, data);
        personStorage.set(id, person);
        return person;
    }

    static get(id: number) {
        return personStorage.get(id);
    }

    static remove(id: number) {
        if(personStorage.has(id)) {
            personStorage.delete(id);
        }
    }
}