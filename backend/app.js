import express from "express";
import dotenv from "dotenv";
import  router  from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});