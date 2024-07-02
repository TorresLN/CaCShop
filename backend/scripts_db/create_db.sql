CREATE DATABASE cac_shop_db;

CREATE TABLE IF NOT EXISTS productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    img VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    talles CHAR(1) NOT NULL,
    colores VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    destacado TINYINT(1) NOT NULL DEFAULT 0
);