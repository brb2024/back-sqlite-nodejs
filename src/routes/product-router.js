import express from 'express'
import { obtenerProductos, agregarProducto, obtenerProducto } from '../controllers/product-controller.js'

// Crear un router
const router = express.Router()

// Ruta para obtener productos
router.get('/', obtenerProductos)

// Ruta para obtener un producto
router.get('/:id', obtenerProducto)

// Ruta para agregar un producto
router.post('/', agregarProducto)

export default router
