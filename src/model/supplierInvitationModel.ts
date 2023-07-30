import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

interface SupplierInvitationAttributes {
  id: number;
  supplier_id: number | null;
  commerce_cell_phone: string | null;
  entry_date: Date;
}

class SupplierInvitation extends Model<SupplierInvitationAttributes> {}

SupplierInvitation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    commerce_cell_phone: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "supplier_invitation", // Nombre de la tabla en la base de datos
    timestamps: false, // Si no necesitas las columnas de createdAt y updatedAt
  }
);

export default SupplierInvitation;
