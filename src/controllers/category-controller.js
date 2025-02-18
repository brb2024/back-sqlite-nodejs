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
