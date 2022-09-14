-- Crean un usuario
CREATE USER 'frias'@'localhost' IDENTIFIED BY 'Vfrias3001';

-- Asignan privilegios ALL a un usuario
GRANT ALL PRIVILEGES ON * . * TO 'frias'@'localhost';

-- Se crea la base de datos
create database mysqlProductos;
