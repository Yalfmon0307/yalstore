-- Tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    productName VARCHAR(255),
    price DECIMAL(10, 2),
    imagen BYTEA,
    ownerId INT NOT NULL,
    storeId INT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (storeId) REFERENCES store(id) ON DELETE CASCADE
);

-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabla de tiendas
CREATE TABLE store (
    id SERIAL PRIMARY KEY,
    storeName VARCHAR(255) NOT NULL,
    ownerId INT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE
);