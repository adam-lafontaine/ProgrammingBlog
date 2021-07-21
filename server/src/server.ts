import express from "express";
import cors from "cors" // https://expressjs.com/en/resources/middleware/cors.html
import { hc } from "./controllers/home_controller";
import { pc } from "./controllers/post_controller";
import { mc } from "./controllers/media_controller"


// const cors_options = { origin: ["http://localhost:8080"]};
const cors_all = cors();

const app = express();

app.use(cors_all);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = 8081; // default port to listen


//app.use(express.static(client_path));

// serve client
app.get("/", hc.home);

// api routes

app.get("/api/post", pc.send_post);


app.get("/api/image/:id", mc.send_image);


// start the Express server
app.listen( port, () => {
    console.log( `server started on port ${ port }` );
} );