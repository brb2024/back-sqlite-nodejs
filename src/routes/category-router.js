import express from 'express'
import { obtenerCategorias, obtenerCategoria, agregarCategoria, modificarCategoria } from '../controllers/category-controller.js'

// Crear un router
const router = express.Router()

// Ruta para obtener productos
router.get('/', obtenerCategorias)

// Ruta para obtener categoria por id
router.get('/:id', obtenerCategoria)

// Ruta para agregar categoria
router.post('/', agregarCategoria)

// Ruta para modificar categoria
router.put('/:id', modificarCategoria)

export default router
