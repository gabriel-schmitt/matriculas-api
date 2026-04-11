import express from "express";
import type { Request, Response, NextFunction } from "express";

// @ts-expect-error CJS router (no TS types)
const matriculasApiRouter = require("./routes/matriculasApi.routes.js");

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.sendStatus(204);
        return;
    }
    next();
});

app.get("/", (_req: express.Request, res: express.Response) => {
    res.json({ ok: true, name: "matriculas-api" });
});

app.use("/api/matriculas", matriculasApiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
