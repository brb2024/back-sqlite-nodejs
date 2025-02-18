# Creación de tabla `categorias`

```sql
CREATE TABLE categoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL
);
```

# Creación de tabla `productos`

```sql
CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL,
  id_categoria INTEGER NOT NULL,
  CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id)
);
```