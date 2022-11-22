if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const mongoose = require("mongoose")
const path = require('path');
const {getDocument, updateDocument} = require("./controllers/document")


const PORT = process.env.PORT || 7000;
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/blog-website";

server.listen(PORT);

app.use(express.static("client/build"));
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
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