import { Model, Column, Table, DataType, Index } from 'sequelize-typescript';
import { Account } from './Account';
import { CharacterData } from '../../../../shared/CharacterCreator/CharacterDataType';

@Table({ tableName: 'persons', timestamps: false })
export class Person extends Model<Person> {
    @Index
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    accountId: number;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sex!: number;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    static!: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
        defaultValue: {}
    })
    characterData: CharacterData;
}

export { Account };