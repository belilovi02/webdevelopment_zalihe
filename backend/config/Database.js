import {Sequelize} from "sequelize";

const db = new Sequelize('zalihe_184_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;