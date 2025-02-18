import express from 'express'
import { obtenerProductos, agregarProducto, obtenerProducto, modificarProducto, borrarProducto } from '../controllers/product-controller.js'

// Crear un router
const router = express.Router()

// Ruta para obtener productos
router.get('/', obtenerProductos)

// Ruta para obtener un producto
router.get('/:id', obtenerProducto)

// Ruta para agregar un producto
router.post('/', agregarProducto)

// Ruta para modificar producto
router.put('/:id', modificarProducto)

// Ruta para borrar producto
router.delete('/:id', borrarProducto)

export default router
