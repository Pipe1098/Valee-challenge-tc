import { Request, Response } from "express";
//import Supplier from "../model/supplier";
import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize("invitations2", "root", "Lfpb10698123*", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  });

  export class Supplier extends Model {

  }
  
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
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
      tableName: "supplier",
      timestamps: false,
    }
  );
  


export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, code, is_active } = req.body;

   
    const newSupplier = await Supplier.create({
      name,
      code,
      is_active,
    });

    
    return res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error al crear el supplier:", error);
    return res.status(500).json({ message: "Error al crear el supplier" });
  }
};
