import { Sequelize } from "sequelize";

const sequelize = new Sequelize("invitations2", "root", "Lfpb10698123*", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default sequelize;

