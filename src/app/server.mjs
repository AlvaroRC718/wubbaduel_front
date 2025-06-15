import app from "./app.mjs"

//node server.mjs 
const port = 4000;

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`);
});
