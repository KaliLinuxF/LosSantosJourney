import { Model, Column, Table, DataType, Index, HasMany } from 'sequelize-typescript';
import { Person } from './Person';

@Table({ tableName: 'accounts', timestamps: false })
class Account extends Model<Account> {
    @Index
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    // @HasMany(() => Person)
    // persons: Person[];
    
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