import express, { response } from "express"
import cors from "cors"

import { Usuario, Producto, Contacto, Perfil} from './lib/db.mjs'

const app = express ()
app.use(cors())
app.use(express.json())


/*Controladores Usuario*/

app.get("/usuario/", async (req, response) => {
try {
    const usuario = await Usuario.findAll()
    response.status(201)
    response.json(usuario)
} catch { (error)
console.error(error)
response.sendStatus(500)
}});

app.post("/usuario/", async (req, response) => {
    try {
        const {email, password} = req.body
        const usuario = new Usuario ({email, password})
        const usuarios = await usuario.save()
        response.json(usuarios)
    } catch (error) {
        console.error(error)
        response.sendStatus(500)
   }});

app.post("/usuario/login/", async (req, response) => {
    try {
        const usuario = await Usuario.findOne({
            where: {email: req.body.email}
        })
        if (usuario) {
            response.status(usuario.password === req.body.password ? 200 : 401)
            response.json(usuario.password === req.body.password ? {id: usuario.id} : "")
        } else {
            response.sendStatus(401)
        }
        } catch (error) {
        console.error(error)
        response.sendStatus(401)
}});


/*Controladores producto*/
app.get("/producto/", async (req, response) => {
    try {
        const producto = await Producto.findAll()
        response.status(201)
        response.json(producto)
    } catch { (error)
    console.error(error)
    response.sendStatus(500)
}});

app.post("/producto/", async (req, response) => {
    try {
        const {nombre, cantidad, preciocompra, precioventa, iva} = req.body
        const producto = new Producto ({nombre, cantidad, preciocompra, precioventa, iva})
        const productos = await producto.save()
        response.json(productos)
    } catch (error) {
        console.error(error)
        response.sendStatus(500)
   }});

/*Controladores perfil*/

app.get("/perfil/", async (req, response) => {
    try {
        const perfil = await Perfil.findAll()
        response.status(201)
        response.json(perfil)
    } catch { (error)
    console.error(error)
    response.sendStatus(500)
}});


/* Controladores contacto */

app.get("/contacto/", async (req, response) => {
    try {
        const contacto = await Contacto.findAll()
        response.status(201)
        response.json(contacto)
    } catch { (error)
    console.error(error)
    response.sendStatus(500)
}});

app.post("/contacto/", async (req, response) => {
    try {
        const {nombre, email, mensaje} = req.body
        const contacto = new Contacto ({nombre, email, mensaje})
        const contactos = await contacto.save()
        response.json(contactos)
    } catch (error) {
        console.error(error)
        response.sendStatus(500)
   }});




app.listen( 8000, () => {console.log("Funcionando...")})