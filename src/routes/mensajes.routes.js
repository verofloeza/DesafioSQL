import { Mensajes } from "../models/mensajes.js";
import express from "express";

const routerMensajes = express.Router();

const ApiMensajes = new Mensajes('MENSAJES');
let DB_MENSAJES;

routerMensajes.post( "/mensajes", async (req, res) => {
    await ApiMensajes.insertar(req.body);
    DB_MENSAJES = Object.values(JSON.parse(JSON.stringify(await ApiMensajes.listarAll())));
    req.io.emit('from-server-mensajes', {DB_MENSAJES});
    res.redirect('/');
});

export default routerMensajes;