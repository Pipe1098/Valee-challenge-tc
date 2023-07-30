import { Application, Request, Response } from "express";
import { getInvitations, loadInvitationsFromFile } from "./invitations";
import { createSupplier } from "./supplierController";
import multer from "multer";
import CoursesData from "../../data/courses.json";

export const loadApiEndpoints = (app: Application, upload: multer.Multer): void => {
	app.get("/api", (req: Request, res: Response) => {
		return res.status(200).send(CoursesData);
	});
	app.get("/produ", (req: Request, res: Response) => {
		return res.status(200).send(CoursesData);
	});

	app.post("/api/v1/invitations", upload.single("file"), loadInvitationsFromFile);

	app.post("/api/v1/suppliers", createSupplier);

	app.get("/api/v1/invitations", getInvitations); 

};





