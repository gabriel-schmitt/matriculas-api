import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("API de Cursos de Matrículas com TypeScript e ESM!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
