// src/config/database.ts
import dotenv from "dotenv";
dotenv.config(); // Charge le fichier .env

import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig);

export async function initDatabase() {
  try {
    // Connexion SANS spécifier la base de données
    const connectionWithoutDb = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });
    
    // Créer la base de données si elle n'existe pas
    await connectionWithoutDb.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connectionWithoutDb.end();
    
    // Maintenant se connecter avec le pool normal
    const connection = await pool.getConnection();
    
    // Créer la table properties
    await connection.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        surface DECIMAL(8, 2) NOT NULL,
        rooms INT NOT NULL,
        bedrooms INT NOT NULL,
        bathrooms INT NOT NULL,
        type ENUM('appartement', 'maison', 'studio', 'loft', 'villa') NOT NULL,
        status ENUM('disponible', 'vendu', 'loue', 'reserve') NOT NULL DEFAULT 'disponible',
        imageUrl VARCHAR(500),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_city (city),
        INDEX idx_price (price),
        INDEX idx_type (type),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    connection.release();
    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
}