import express from "express"
import cors from "cors" // https://expressjs.com/en/resources/middleware/cors.html
import { hc } from "./controllers/home_controller"
import { pc } from "./controllers/post_controller"
import { rc } from "./controllers/resource_controller"
import path from "path";
import Config from "./server_config"


// const cors_options = { origin: ["http://localhost:8080"]};
const cors_all = cors();

const app = express();

app.use(cors_all);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(Config.CLIENT_PATH));


// api routes
app.get("/api/home", hc.send_content);

app.get("/api/post/list", pc.send_post_list);
app.get("/api/post/:id", pc.send_post);

app.get("/api/resources/videos", rc.send_video_resources);

app.all("/*", (req, res) => { res.sendFile(Config.INDEX_PATH)});

// start the Express server
app.listen(Config.SERVER_PORT, () => {
    console.log( `server listening on port ${ Config.SERVER_PORT }` );
} );