import "dotenv/config";
import express from "express";
import route from "./routes/routes";

const app = express()

app.use(express.json())
app.use(route)

app.listen(3333, ()=>{
    console.log("Servidor rodando em http://localhost:3333")
})
