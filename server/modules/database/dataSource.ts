import { DataSource } from 'typeorm';
import { Account } from './entitys/Account';

const needSync = true;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Admin456',
    database: 'lsj',
    synchronize: needSync,
    logging: false,
    entities: [Account],
});