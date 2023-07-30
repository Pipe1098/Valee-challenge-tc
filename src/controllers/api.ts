import { Application, Request, Response } from "express";
import multer from "multer";
import { getInvitations, loadInvitationsFromFile } from "../service/InvitationsService";
import { createSupplier } from "../service/supplierService";



export const loadApiEndpoints = (app: Application, upload: multer.Multer): void => {
/**
 * @swagger
 * /api/v1/invitations:
 *   post:
 *     summary: Cargar invitaciones desde un archivo CSV
 *     description: Carga las invitaciones desde un archivo CSV y las guarda en la base de datos.
 *     parameters:
 *       - name: file
 *         in: formData
 *         description: Archivo CSV que contiene las invitaciones.
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Invitaciones cargadas exitosamente.
 *       400:
 *         description: Error al cargar las invitaciones debido a un archivo CSV inválido.
 *       500:
 *         description: Error interno del servidor.
 */
	app.post("/api/v1/invitations", upload.single("file"), loadInvitationsFromFile);

	app.post("/api/v1/suppliers", createSupplier);

	app.get("/api/v1/invitations", getInvitations);
};
