import { Sequelize } from "sequelize";

// Configura la conexión a la base de datos
const sequelize = new Sequelize("database_name", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Desactiva los mensajes de registro de sequelize
});

export default sequelize;