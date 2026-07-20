import express from "express";
import {fileURLToPath} from  "url";
import {join, dirname} from "path"
import http from "http"
import dotenv from "dotenv"
import cors from "cors"
import {connectToDB} from "./components/database/MongoBD.js"
import userRoutes from "../Backend/components/routes/user.route.js"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const _dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(_dirname, "index.html");

app.get("/", (req,res)=>{
    res.sendFile(filePath);
})

app.use("/users",userRoutes);

connectToDB();

const port = process.env.PORT || 3000
server.listen(port, "0.0.0.0", (req,res)=>{
    console.log(`Server is listening on port: ${port}`);
})