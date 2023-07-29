import { Application, Request, Response } from "express";

import CoursesData from "../../data/courses.json";

export const loadApiEndpoints = (app: Application): void => {
	app.get("/product", (req: Request, res: Response) => {
		return res.status(200).send(CoursesData);
	});
};

export const loadApiEndpoint = (app: Application): void => {
	app.get("/produ", (req: Request, res: Response) => {
		return res.status(200).send(CoursesData);
	});
};