import express from "express";
import path from "path";
import multer from "multer"; 
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
  
  // Carga las rutas de la API
  loadApiEndpoints(app, upload); // Pasa la instancia de multer al controlador de invitaciones
  

export default app;

