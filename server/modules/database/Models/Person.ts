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
    login!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column(DataType.STRING)
    lastLoginIp!: string;

    @Column(DataType.STRING)
    registrationIp!: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    registrationDate!: Date;

    @Index
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    promoCode!: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    donat!: number;

    @Column(DataType.STRING)
    socialClub!: string;

    @Column(DataType.STRING)
    serial!: string;
}

export { Account };