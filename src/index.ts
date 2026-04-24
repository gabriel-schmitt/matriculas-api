import express from "express";
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
