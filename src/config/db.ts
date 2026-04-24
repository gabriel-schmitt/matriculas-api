import pg from "pg";

const { Pool } = pg;

const port = Number(process.env.DB_PORT);
const poolConfig = {
  host: process.env.DB_HOST,
  port: Number.isFinite(port) && port > 0 ? port : 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  /** Evita pendurar pedidos HTTP ~20s quando o host/porta do Postgres está errado. */
  connectionTimeoutMillis: 8_000,
};

export const pool = new Pool(poolConfig);

pool.on("error", (err: Error) => {
  console.error("[pg pool] erro em cliente ocioso (conexão com o banco):", err.message);
});
