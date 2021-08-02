import path from "path"

const Config = {

    SERVER_PORT: 8081,

    CLIENT_PATH: path.join(__dirname, "../client_files"),
    INDEX_PATH: path.join(__dirname, "../client_files/index.html"),

    PAGES_PATH: path.join(__dirname, "../../content/pages"),
    POSTS_PATH: path.join(__dirname, "../../content/posts"),
    RESOURCES_PATH: path.join(__dirname, "../../content/resources")
};

export default Config;