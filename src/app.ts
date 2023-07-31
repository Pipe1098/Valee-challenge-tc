import express from "express";
import multer from "multer";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


import { loadApiEndpoints } from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

// Configura el almacenamiento de multer para los archivos cargados
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../uploads")); // Establece la carpeta de destino para los archivos cargados
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Establece el nombre del archivo en el servidor como el nombre original del archivo
	},
});

const upload = multer({ storage }); // Crea una instancia de multer con la configuración de almacenamiento

// Rutas estáticas (si es necesario)
app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));



 

// const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "API de Mi Proyecto",
//         version: "1.0.0",
//         description: "Documentación de la API de Mi Proyecto",
//       },
//     },
//     apis: ["./controllers/api.ts", "./controllers/*.ts"], // Ruta a los archivos que contienen las rutas de la API
//   };
  
  
//   const swaggerSpec = swaggerJsdoc(options);
  
//   // Ruta para acceder a la interfaz de Swagger
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  loadApiEndpoints(app, upload);
  export default app;