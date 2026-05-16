-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS mvc_project;
USE mvc_project;

-- CREATE TABLE
CREATE TABLE IF NOT EXISTS products (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT SAMPLE DATA
INSERT INTO products (name, description, price) VALUES 
('Laptop', 'High performance laptop for development', 1200.00),
('Mouse', 'Wireless optical mouse', 25.50),
('Keyboard', 'Mechanical gaming keyboard', 75.99);
