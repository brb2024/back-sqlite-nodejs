import db from '../database/connection.js'
import Producto from '../models/producto.js'

// Función para obtener todos los productos
export async function obtenerProductos (req, res) {
  try {
    const database = await db.getDb()
    const productos = await database.all('SELECT * FROM productos')
    res.json(productos)
  } catch (error) {
    console.error(`Error en la consulta: ${error}`)
    res.json({ error: 'Error en la consulta', description: error.message })
  }
}

// Función para obtener un producto
export async function obtenerProducto (req, res) {
  const { id } = req.params

  try {
    const database = await db.getDb()
    const producto = await database.get('SELECT * FROM productos WHERE id = ?', id)
    res.json(producto)
  } catch (error) {
    console.error(`Error en la consulta: ${error}`)
    res.json({ error: 'Error en la consulta', description: error.message })
  }
}

// Función para agregar un producto
export async function agregarProducto (req, res) {
  const producto = new Producto(req.body.nombre, req.body.precio, req.body.idCategoria)

  try {
    const database = await db.getDb()
    await database.run('INSERT INTO productos (nombre, precio, id_categoria) VALUES (?, ?, ?)', [producto.nombre, producto.precio, producto.idCategoria])
    res.json({ message: 'Producto agregado' })
  } catch (error) {
    console.error(`Error al agregar el producto: ${error}`)
    res.status(500).json({ error: 'Error al agregar el producto', description: error.message })
  }
}

// Funcion para modificar producto
export async function modificarProducto (req, res) {
  const { id } = req.params
  const { nombre, precio, idCategoria } = req.body

  try {
    const database = await db.getDb()
    await database.run('PRAGMA foreign_keys = ON')
    await database.run('UPDATE productos SET nombre = ?, precio = ?, id_categoria = ? WHERE id = ?', [nombre, precio, idCategoria, id])
    res.json({ message: 'Producto modificado' })
  } catch (error) {
    console.error(`Error al modificar el producto: ${error}`)
    res.status(500).json({ error: 'Error al agregar el producto', description: error.message })
  }
}
