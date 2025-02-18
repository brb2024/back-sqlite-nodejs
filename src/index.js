import express from 'express'
import { logger } from './middlewares/middleware.js'
import Database from './database/connection.js'
import productRouter from './routes/product-router.js'
import categoryRouter from './routes/category-router.js'

const app = express()
const port = 3000

app.set('json spaces', 2)

// Conexion a base de datos
Database.connect()

// Custom middleware
app.use(logger)

// Middleware
app.use(express.json())

// Rutas
app.use('/productos', productRouter)
app.use('/categorias', categoryRouter)

app.listen(port, () => {
  console.log(`Servidor en puerto: ${port}`)
})
