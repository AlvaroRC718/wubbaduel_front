import app from "./app.mjs"
import process from "process"
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

//node --env-file=../../config.env server.mjs 
const port = 4000;

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`);
});

// Resuelve correctamente rutas relativas con ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo config.env
dotenv.config({ path: path.resolve(__dirname, '../../config.env') });