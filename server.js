const {Server} = require("socket.io");
const mongoose = require("mongoose")
const {getDocument, updateDocument} = require("./controllers/document")

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const PORT = process.env.PORT || 7000;
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/blog-website";

const io = new Server(PORT,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})

mongoose.connect(dbUrl)
.then(()=>console.log("DB Connected"))
.catch(e=>console.log(e))


io.on("connection", socket=>{ // Step 1: connecting to client side
    socket.on("get-document", async documentId =>{
        const document = await getDocument(documentId);
        socket.join(documentId)
        socket.emit("load-document", document.data);           

        socket.on("send-changes", async (delta,data)=>{  // Step 2: Catching delta(text-changes) and data(full-document)
            socket.broadcast.to(documentId).emit("receive-changes", delta) //  and broadcast (send) it to every user who is seeing the file  
            await updateDocument(documentId,data); // saving the full data (The whole document) to DB
           })
    })
})