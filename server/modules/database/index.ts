import { AppDataSource } from "./dataSource";

AppDataSource.initialize().then(() => {
    console.log(`[Database]: Connection success`);
}).catch((error) => {
    console.log(`[Database]: ${error}`)
});