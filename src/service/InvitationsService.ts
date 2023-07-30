import csvParser from "csv-parser";
import { Request, Response } from "express";
import * as fs from "fs";
import SupplierInvitation from "../model/supplierInvitationModel";
import Supplier from "../model/supplierModel";


const validPhoneRegex = /^\+\d{1,2}\d{10}$/;



interface CSVRow {
	supplierId: number;
	commerceCellPhone: string;
}
export const loadInvitationsFromFile = async (req: Request, res: Response) => {
	const file = req.file;
	if (!file) {
		return res.status(400).json({ message: "No se ha proporcionado el archivo CSV" });
	}

	const invitations: any[] = [];

	fs.createReadStream(file.path)
		.pipe(csvParser()) // Omitir la primera línea del archivo (encabezados)
		.on("data", async (row) => {
			const values = Object.values(row) as [number, string]; // Asignamos el tipo a los valores de la fila
			const [supplierId, commerceCellPhone] = values;

			if (isNaN(supplierId)) {
				return res
					.status(400)
					.json({ message: `El supplierId '${values[0]}' no es un número válido` });
			}

			if (!validPhoneRegex.test(commerceCellPhone)) {
				return res
					.status(400)
					.json({ message: `El número de teléfono '${commerceCellPhone}' no es válido` });
			}

			invitations.push({
				supplier_id: supplierId,
				commerce_cell_phone: commerceCellPhone,
			});
		})
		.on("end", async () => {
			try {
				await SupplierInvitation.bulkCreate(invitations);

				return res.status(200).json({
					code: 0,
					message: "Invitaciones guardadas exitosamente",
				});
			} catch (error) {
				console.error("Error al guardar las invitaciones:", error);

				return res.status(500).json({ message: "Error al guardar las invitaciones" });
			}
		});
};

export const getInvitations = async (req: Request, res: Response) => {
	try {
		const invitations = await SupplierInvitation.findAll({
			attributes: ["id", "supplier_id", "commerce_cell_phone"],
			include: [{ model: Supplier, attributes: ["name"], as: "Supplier" }],
		});

		const formattedInvitations = invitations.map((invitation) => ({
			supplierId: invitation.supplier_id,
			supplierName: invitation.Supplier?.name || "Nombre de proveedor no encontrado",
			commerceCellPhone: invitation.commerce_cell_phone ?? "",
		}));

		return res.status(200).json({
			apiResponse: {
				code: 0,
				message: "OK",
			},
			list: formattedInvitations,
		});
	} catch (error) {
		console.error("Error al obtener las invitaciones:", error);

		return res.status(500).json({ message: "Error al obtener las invitaciones" });
	}
};
