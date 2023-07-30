import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/db";


class SupplierInvitation extends Model {
  id: number | undefined;
  supplier_id: number | undefined;
  commerce_cell_phone: string | undefined;
  entry_date: Date | undefined;
    Supplier: any;

  static initModel() {
    SupplierInvitation.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        supplier_Id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        commerce_cell_phone: {
          type: DataTypes.STRING(256),
          allowNull: true,
        },
        entry_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        modelName: "SupplierInvitation",
        tableName: "supplier_invitation",
        timestamps: false,
      }
    );
  }

  static associate(models: any) {
    SupplierInvitation.belongsTo(models.Supplier, {
      foreignKey: "supplier_id",
      targetKey: "id",
      as: "Supplier",
    });
  }
}

export default SupplierInvitation;

