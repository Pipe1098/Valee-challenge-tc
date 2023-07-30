
import { Request, Response } from "express"
import Supplier from "../model/supplierModel";


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