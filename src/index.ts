import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("aaaaaaaa!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
