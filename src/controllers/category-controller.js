import db from '../database/connection.js'
import Categoria from '../models/categoria.js'

// Función para obtener todos las categorias
export async function obtenerCategorias (req, res) {
  try {
    const database = await db.getDb()
    const categorias = await database.all('SELECT * FROM categorias')
    res.json(categorias)
  } catch (error) {
    console.error(`Error en la consulta: ${error}`)
    res.json({ error: 'Error en la consulta', description: error.message })
  }
}

// Funcion para obtener categoria por id
export async function obtenerCategoria (req, res) {
  const { id } = req.params

  try {
    const database = await db.getDb()
    const categoria = await database.get('SELECT * FROM categorias WHERE id = ?', id)
    res.json(categoria)
  } catch (error) {
    console.error(`Error en la consulta: ${error}`)
    res.json({ error: 'Error en la consulta', description: error.message })
  }
}

// Función para agregar una categoria
export async function agregarCategoria (req, res) {
  const { descripcion } = req.body
  const categoria = new Categoria(descripcion)

  try {
    const database = await db.getDb()
    await database.run('INSERT INTO categorias (descripcion) VALUES (?)', categoria.descripcion)
    res.json({ message: 'Categoria agregada' })
  } catch (error) {
    console.error(`Error al agregar categoria: ${error}`)
    res.status(500).json({ error: 'Error al agregar categoria', description: error.message })
  }
}

// Funcion para modificar categoria
export async function modificarCategoria (req, res) {
  const { id } = req.params
  const { descripcion } = req.body

  try {
    const database = await db.getDb()
    await database.run('PRAGMA foreign_keys = ON')
    await database.run('UPDATE categorias SET descripcion = ?  WHERE id = ?', [descripcion, id])
    res.json({ message: 'Categoria modificada' })
  } catch (error) {
    console.error(`Error al modificar categoria: ${error}`)
    res.status(500).json({ error: 'Error al agregar la categoria', description: error.message })
  }
}

// Funcion para borrar categoria
export async function borrarCategoria (req, res) {
  const { id } = req.params

  try {
    const database = await db.getDb()
    const result = await database.run('DELETE FROM categorias WHERE id = ?', id)

    if (result.changes === 0) {
      res.status(404).json({ message: 'Categoria no encontrada' })
    } else {
      res.json({ message: 'Categoria eliminada' })
    }
  } catch (error) {
    console.error(`Error al modificar categoria: ${error}`)
    res.status(500).json({ error: 'Error al modificar categoria', description: error.message })
  }
}
