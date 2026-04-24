import express from "express";
import { pool } from "./config/db.js";
import cursoRoutes from "./routes/cursoRoutes.js";
import iesRoutes from "./routes/iesRoutes.js";
import matriculaRoutes from "./routes/matriculaRoutes.js";

const app = express();
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("API de Cursos de Matrículas!");
});

app.use("/api/cursos", cursoRoutes);
app.use("/api/ies", iesRoutes);
app.use("/api/matriculas", matriculaRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  void pool
    .query("SELECT 1")
    .then(() => console.log("[db] Postgres OK"))
    .catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[db] Postgres indisponível:", msg);
      if (process.env.DB_HOST === "db") {
        console.error(
          "[db] DB_HOST=db só funciona dentro do Docker Compose. Rodando a API no host, use DB_HOST=127.0.0.1 (ou localhost) e DB_PORT igual à porta publicada do Postgres no compose.",
        );
      }
    });
});
