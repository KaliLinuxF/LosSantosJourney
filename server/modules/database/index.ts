import { Sequelize } from 'sequelize-typescript';
import { Account } from './Models/Account';
import mysql2 from 'mysql2';

const sequelize = new Sequelize({
  database: 'lsj',
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  dialectModule: mysql2,
  password: 'Admin456',
  models: [Account]
});

async function db() {
    try {
        await sequelize.sync();
        console.log('[Database]: Sequelize connected');
    } catch (error) {
        console.log('[Database]: ', error);
    }
}

db();