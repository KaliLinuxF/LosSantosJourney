import { Sequelize } from 'sequelize-typescript';
import { Account } from './Models/Account';
import mysql2 from 'mysql2';
import { Person } from './Models/Person';

const sequelize = new Sequelize({
  database: 'lsj',
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  dialectModule: mysql2,
  password: 'Admin456',
  logging: false,
  sync: { alter: true }
});

sequelize.addModels([
    Account,
    Person
]);

async function db() {
    try {
        await sequelize.sync();
        mp.events.call('database:ready');
        console.log('[Database]: Sequelize connected');
    } catch (error) {
        console.log('[Database]: ', error);
    }
}

db();