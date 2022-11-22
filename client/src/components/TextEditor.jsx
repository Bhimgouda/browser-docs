import Quill from "quill"
import "quill/dist/quill.snow.css"
import React, { useCallback, useEffect } from 'react'
import { useState } from "react"
import { useParams } from "react-router-dom"
import {io} from "socket.io-client"


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]

export default function TextEditor() {
    const [socket,setSocket] = useState()
    const [quill,setQuill] = useState()

    const {id:documentId} = useParams()

    // Step 1: Connecting to socket.io backend server
    useEffect(()=>{
        const socketServer = io("")
        setSocket(socketServer)

        return ()=>{
            socketServer.disconnect();  // RETURN IS BASICALLY USED TO DEFINE COMPONENT WILL UNMOUNT FUNCTION (for cleanup code)
        }
    },[])


    useEffect(()=>{
        if(socket==null||quill==null) return;

        socket.emit('get-document', documentId)

        socket.once('load-document',document=>{
            quill.setContents(document);
            quill.enable();
        })

    },[quill,socket,documentId])


    // Step 2: This useEffect is dependent on quill,socket and this listens if there was any text change on quill
    // and then on every text change it sends a req to server with the changed data (which is delta in this case)
    useEffect(()=>{
        if(socket==null||quill==null) return;

        const handler = (delta,oldData,source)=>{
            if(source!=="user") return;
            socket.emit("send-changes", delta, quill.getContents())
        }

        quill.on("text-change",handler)

        return ()=>{
            quill.off("text-change", handler)
        }
    },[socket,quill])


    // Step 3: This useEffect then listens to the data received from the server and update the quills content.
    useEffect(()=>{
        if(socket==null||quill==null) return;

        const handler = (delta)=>{
            quill.updateContents(delta)
        }

        socket.on("receive-changes",handler)

        return ()=>{
            quill.off("receive-changes", handler)
        }
    },[socket,quill])

  // This is how step 1, step 2, step 3 and the server side code to receive the text-change data from 1 client and then save it to DB and send back the changed data to all the other clients
  // so that the content can be updated there simultaneously wheneven any change is made to a file
  // This is how the changes can be detected on multiple clients browser whenever a change is made by any one

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
    
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        })
        setQuill(q)
        q.disable();
        q.setText("Loading...")
      }, [])


      return <div className="container" ref={wrapperRef}></div>
    
}