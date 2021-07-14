import express from "express";
import cors from "cors" // https://expressjs.com/en/resources/middleware/cors.html
import path from "path"
import { HomeController } from "./controllers/home_controller";


// const cors_options = { origin: ["http://localhost:8080"]};
const cors_all = cors();

const app = express();

app.use(cors_all);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = 8081; // default port to listen

const client_path = path.join(__dirname, "client");
//app.use(express.static(client_path));

// serve client
app.get("/", (req, res) =>{ res.sendFile(path.join(client_path, "index.html"));});


const controller = new HomeController();

// api routes
app.get("/api", controller.home);
app.get("/api/props", controller.request_props);
app.get("/api/:id", controller.try_echo);

app.post("/update", controller.update_data);


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );