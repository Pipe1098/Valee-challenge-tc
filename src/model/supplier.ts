// models/supplier.ts
// import { Model, DataTypes } from "sequelize";
// import sequelize from "../db";


// class Supplier extends Model {
//   public id!: number;
//   public name!: string;
//   public code!: string | null;
//   public is_active!: boolean;
//   public entry_date!: Date;

//   // Aquí puedes definir relaciones o métodos adicionales del modelo si es necesario
// }

// Supplier.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING(256),
//       allowNull: false,
//     },
//     code: {
//       type: DataTypes.STRING(45),
//       allowNull: true,
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     entry_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Supplier",
//     tableName: "supplier",
//     timestamps: false,
//   }
// );

// export default Supplier;
