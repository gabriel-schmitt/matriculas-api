import { pool } from "../config/db.js";
import { IModel } from "../models/interfaces/IModel.js";
import { IRepository } from "./interfaces/IRepository.js";

export abstract class Repository<T extends IModel> implements IRepository<T> {
  constructor(private readonly tableName: string) {}

  async create(model: Omit<T, 'id'>): Promise<T> {
    const sql = `
      INSERT INTO ${this.tableName} (${Object.keys(model).join(", ")})
      VALUES (${Object.values(model).map((_, i) => `$${i + 1}`).join(", ")})
      RETURNING *;
    `;

    const values = Object.values(model);

    const result = await pool.query(sql, values);
    return result.rows[0];
  }

  async findAll(limit: number = 10): Promise<T[]> {
    const result = await pool.query(
      `SELECT * FROM ${this.tableName} ORDER BY id LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  async findById(id: number): Promise<T | null> {
    const result = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, model: Omit<T, 'id'>): Promise<T | null> {
    const sql = `
      UPDATE ${this.tableName} SET ${Object.keys(model).map((key, i) => `${key} = $${i + 1}`).join(", ")}
      WHERE id = $${Object.keys(model).length + 1}
      RETURNING *;
    `;

    const values = [...Object.values(model), id];

    const result = await pool.query(sql, values);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await pool.query(
      `DELETE FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
  }
}