import request from "supertest";

import app from "../src/app";
import { Supplier } from "../src/model/supplierModel";

describe("POST /api/v1/invitations", () => {
	it("should return 400 Bad Request if no file is provided", async () => {
		const response = await request(app).post("/api/v1/invitations").expect(400);
		expect(response.body).toEqual({ message: "No se ha proporcionado el archivo CSV" });
	});

	it("should return 200 OK and save invitations when a valid CSV file is provided", async () => {
		// Simular un archivo CSV válido con contenido de ejemplo
		const csvData = "supplierId,commerceCellPhone\n1,+573002226598\n2,+223112569845";
		const response = await request(app)
			.post("/api/v1/invitations")
			.attach("file", Buffer.from(csvData), { filename: "test.csv" })
			.expect(200);

		expect(response.body).toEqual({
			code: 0,
			message: "Invitaciones guardadas exitosamente",
		});
	});
});

describe("POST /api/v1/suppliers", () => {
	it("should return 201 Created and create a new supplier", async () => {
		const newSupplierData = {
			name: "New Supplier",
			code: "SUP123",
			is_active: true,
		};

		const response = await request(app).post("/api/v1/suppliers").send(newSupplierData).expect(201);

		expect(response.body).toMatchObject(newSupplierData);
	});

	it("should return 500 Internal Server Error if there is an error creating the supplier", async () => {
		jest.spyOn(Supplier, "create").mockRejectedValue(new Error("Error creating supplier"));

		const newSupplierData = {
			name: "New Supplier",
			code: "SUP123",
			is_active: true,
		};

		const response = await request(app).post("/api/v1/suppliers").send(newSupplierData).expect(500);

		expect(response.body).toEqual({ message: "Error al crear el supplier" });
	});
});

describe("GET /api/v1/invitations", () => {
	it("should return 200 OK and a list of invitations", async () => {
		const response = await request(app).get("/api/v1/invitations");

		expect(response.status).toBe(200);

		expect(response.body.apiResponse.code).toBe(0);
		expect(response.body.apiResponse.message).toBe("OK");

		expect(Array.isArray(response.body.list)).toBe(true);
		expect(response.body.list[0].supplierId).toBe(1);
		expect(response.body.list[0].supplierName).toBe("Proveedor Ejemplo");
		expect(response.body.list[0].commerceCellPhone).toBe("+573002226598");
	});
});
