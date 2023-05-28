import { Model, Column, Table, DataType, Index, BelongsTo } from 'sequelize-typescript';
import { Account } from './Account';

@Table({ tableName: 'persons', timestamps: false })
export class Person extends Model<Person> {
    @Index
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @BelongsTo(() => Account)
    account: Account

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

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
    characterData: string;
}

export { Account };