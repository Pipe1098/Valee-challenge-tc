import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/db";


 export class Supplier extends Model {
  id: number | undefined;
  name: string | undefined;
  code: string | undefined;
  isActive: boolean | undefined;
  entryDate: Date | undefined;

  static initModel() {
    Supplier.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        entryDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        modelName: "Supplier",
        tableName: "supplier",
        timestamps: false,
      }
    );
  }
}

export default Supplier;

