import express from "express"
import cors from "cors" // https://expressjs.com/en/resources/middleware/cors.html
import { hc } from "./controllers/home_controller"
import { pc } from "./controllers/post_controller"
import { rc } from "./controllers/resource_controller"


// const cors_options = { origin: ["http://localhost:8080"]};
const cors_all = cors();

const app = express();

app.use(cors_all);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = 8081; // default port to listen

const root_path = "/home/adam/repos/ProgrammingBlog";
const client_path = root_path + "/server/client";


app.use(express.static(client_path));

// serve client
app.get("/", hc.send_client);

// api routes
app.get("/api/home", hc.send_content);

app.get("/api/post/list", pc.send_post_list);
app.get("/api/post/:id", pc.send_post);

app.get("/api/resources/videos", rc.send_video_resources);


// start the Express server
app.listen( port, () => {
    console.log( `server started on port ${ port }` );
} );