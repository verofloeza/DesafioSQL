import express, { urlencoded } from "express";

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import { join } from "path";
import routerMensajes from './src/routes/mensajes.routes.js';
import routerProductos from "./src/routes/productos.routes.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


// /*-------------------Middleware-------------------------*/
app.use(urlencoded({ extended: true}));
app.use(express.static('./public'));

//Motor de plantillas
app.engine('hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: 'hbs'
}));

app.set('views', join( './views'));
app.set('view engine', 'hbs');
app.set('socketio', io);

// /*-------------------Rutas-------------------------*/
app.use((req, res, next) => {
    req.io = io;
    return next();
  });

app.use("/", routerProductos);

/* ---------------------- WebSocket ----------------------*/
io.on('connection', (socket)=>{

    console.log(`Nuevo cliente conectado! ${socket.id}`);

  });
  
/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
});
server.on('error', err => console.log(`error en server ${err}`));


