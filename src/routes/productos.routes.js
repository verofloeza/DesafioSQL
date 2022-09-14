import { Mensajes } from "../models/mensajes.js";
import { Productos } from "../models/productos.js";
import express from "express";

const routerProductos = express.Router();

const ApiProductos = new Productos('PRODUCTOS');
let DB_PRODUCTOS;

const ApiMensajes = new Mensajes('MENSAJES');
let DB_MENSAJES;

routerProductos.get( "/", async (req, res) => {
    DB_PRODUCTOS = Object.values(JSON.parse(JSON.stringify(await ApiProductos.listarAll())));
    DB_MENSAJES = Object.values(JSON.parse(JSON.stringify(await ApiMensajes.listarAll())));
    res.render('vista', {DB_PRODUCTOS, DB_MENSAJES});

});

routerProductos.post( "/productos", async (req, res) => {
    await ApiProductos.insertar(req.body);
    DB_PRODUCTOS = Object.values(JSON.parse(JSON.stringify(await ApiProductos.listarAll())));
    req.io.emit('from-server-producto', {DB_PRODUCTOS});
    res.redirect('/');
    
    
});

routerProductos.post( "/mensajes", async (req, res) => {
    await ApiMensajes.insertar(req.body);
    DB_MENSAJES = Object.values(JSON.parse(JSON.stringify(await ApiMensajes.listarAll())));
    req.io.emit('from-server-mensajes', {DB_MENSAJES});
    res.redirect('/');
});

export default routerProductos;