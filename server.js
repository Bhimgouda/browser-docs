const {Server} = require("socket.io");

const PORT = process.env.PORT || 7000;

const io = new Server(PORT,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})

io.on("connection",socket=>{ // Step 1: connecting to client side
    socket.on("get-document", documentId =>{
        const data = "";
        socket.join(documentId)
        socket.emit("load-document",data);

        socket.on("send-changes", delta=>{  // Step 2: Catching delta(text) and broadcast (send) it to every user who is seeing the file  
            socket.broadcast.to(documentId).emit("receive-changes", delta)
           })
    })
})