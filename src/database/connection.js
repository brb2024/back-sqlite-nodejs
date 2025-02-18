import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class Database {
  constructor () {
    // Propiedad para almacenar la conexión a la base de datos
    this.db = null
  }

  // Método para conectar a la base de datos
  async connect () {
    try {
      this.db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
      })

      console.log('Conexion exitosa a BD')
    } catch (err) {
      console.log(`Error en la conexion a la BD: ${err}`)
    }
  }

  // Método para obtener la conexión a la base de datos
  async getDb () {
    if (!this.db) {
      await this.connect()
    }

    return this.db
  }
}

// Exportar una instancia de la clase Database
export default new Database()
