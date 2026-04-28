
import { createServer, IncomingMessage, ServerResponse } from 'http';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
   res.setHeader("Content-type","application/json");
   if(req.url == "/"){
    res.writeHead(200);
    res.end(JSON.stringify({message:"Hello World"}));
   }else{
    res.writeHead(404);
    res.end(JSON.stringify({message:"Not Found"}));
   }
})

server.listen(3000, ()=>{
    console.log("server is running on port 3000");
})