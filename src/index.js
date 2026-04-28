"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server = (0, http_1.createServer)((req, res) => {
    if (req.url == "/") {
        res.end("Hello World");
    }
});
server.listen(3000, () => {
    console.log("server is running on port 3000");
});
//# sourceMappingURL=index.js.map