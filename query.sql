-- database: c:\Users\Usuario\Documents\extra_node\framework_sqlite\database.sqlite

CREATE TABLE categoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL
);

ALTER TABLE categoria RENAME TO 'categorias';

ALTER TABLE categorias RENAME COLUMN description TO 'descripcion';

ALTER TABLE productos ADD COLUMN 'id_categoria';

ALTER TABLE productos ADD FOREIGN KEY(id_categoria) REFERENCES categorias(id);

DROP TABLE productos;

CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL,
  id_categoria INTEGER DEFAULT 1000,
  CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id)
  ON UPDATE CASCADE
  ON DELETE SET DEFAULT
);

PRAGMA foreign_keys = ON
