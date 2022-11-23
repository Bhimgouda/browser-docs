if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const mongoose = require("mongoose")
const path = require('path');
const session = require("express-session");
const MongoStore = require("connect-mongo")
const {getDocument, updateDocument, createDocument, getUserDocuments} = require("./controllers/document");
const { createUser, addDocument, addDocumentToUser, sendUser } = require("./controllers/user");


const PORT = process.env.PORT || 7000;
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/blog-website";


server.listen(PORT);



mongoose.connect(dbUrl)
.then(()=>console.log("DB Connected"))
.catch(e=>console.log(e))

//----------------- EXPRESS SESSION CONFIGURATION ------------------//

const secret = process.env.SECRET || "happysecret";

// Mongo Store initialization
const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60,
});

store.on("error", (e) => {
    console.log("Session Store Error", e);
});

// Session configuration
const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));

app.use(async (req,res,next)=>{
    if(req.session == null) return;
    if(!req.session.user_id) {
        const {_id} = await createUser();
        req.session.user_id = _id
        return next()
    }
    return next()
})

// App Routes

app.get("/api/create-document", createDocument)
app.get('/api/get-user-documents', getUserDocuments)
app.get('/api/user', sendUser)




io.on("connection", socket=>{ // Step 1: connecting to client side
    socket.on("get-document", async (documentId, user_id) =>{
        const document = await getDocument(documentId);
        socket.join(documentId)
        socket.emit("load-document", document);           
        await addDocumentToUser(user_id, document);
        socket.on("send-changes", async (delta,data)=>{  // Step 2: Catching delta(text-changes) and data(full-document)
            socket.broadcast.to(documentId).emit("receive-changes", delta) //  and broadcast (send) it to every user who is seeing the file  
            await updateDocument(documentId,data); // saving the full data (The whole document) to DB
           })
    })
})


app.use(express.static("client/build"));
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})



// Basic Error handler 

app.use((err,req,res,next)=>{
    console.log(err.message);
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
})