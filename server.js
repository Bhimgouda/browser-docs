const {Server} = require("socket.io");

const PORT = process.env.PORT || 7000;

const io = new Server(PORT,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})

io.on("connection",socket=>{ // Step1: connecting to client side
   console.log("connected");
})