import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/database';
import { Property, CreatePropertyDTO, UpdatePropertyDTO, PropertyFilters } from '../types/property.types';

export class PropertyModel {
  
  async findAll(filters?: PropertyFilters, page = 1, limit = 10): Promise<{ properties: Property[], total: number }> {
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM properties WHERE 1=1';
    const params: any[] = [];
    
    if (filters) {
      if (filters.city) {
        query += ' AND city LIKE ?';
        params.push(`%${filters.city}%`);
      }
      if (filters.minPrice) {
        query += ' AND price >= ?';
        params.push(filters.minPrice);
      }
      if (filters.maxPrice) {
        query += ' AND price <= ?';
        params.push(filters.maxPrice);
      }
      if (filters.type) {
        query += ' AND type = ?';
        params.push(filters.type);
      }
      if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
      }
      if (filters.minRooms) {
        query += ' AND rooms >= ?';
        params.push(filters.minRooms);
      }
      if (filters.minSurface) {
        query += ' AND surface >= ?';
        params.push(filters.minSurface);
      }
    }
    
    // Count total
    const [countResult] = await pool.query<RowDataPacket[]>(
      query.replace('SELECT *', 'SELECT COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;
    
    // Get paginated results
    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    
    return {
      properties: rows as Property[],
      total,
    };
  }
  
  async findById(id: number): Promise<Property | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM properties WHERE id = ?',
      [id]
    );
    
    return rows.length > 0 ? (rows[0] as Property) : null;
  }
  
  async create(data: CreatePropertyDTO): Promise<Property> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO properties (title, description, city, address, price, surface, rooms, bedrooms, bathrooms, type, status, imageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.description,
        data.city,
        data.address,
        data.price,
        data.surface,
        data.rooms,
        data.bedrooms,
        data.bathrooms,
        data.type,
        data.status,
        data.imageUrl || null,
      ]
    );
    
    const property = await this.findById(result.insertId);
    if (!property) throw new Error('Erreur lors de la création');
    
    return property;
  }
  
  async update(id: number, data: UpdatePropertyDTO): Promise<Property | null> {
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) {
      return this.findById(id);
    }
    
    values.push(id);
    
    await pool.query(
      `UPDATE properties SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }
  
  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM properties WHERE id = ?',
      [id]
    );
    
    return result.affectedRows > 0;
  }
}