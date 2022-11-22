import React, { useEffect } from 'react'
import {v4 as uuid} from "uuid"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home({socket}) {
  const [documents,setDocuments] = useState();
  const navigate = useNavigate();


  useEffect(()=>{
    if(socket == null) return;
    socket.emit('get-documents');
    socket.once('receive-documents', documents=>{
      setDocuments(documents);
    })
  },[socket])

  const createDocument = ()=>{
    socket.emit("create-document")
    socket.on("created-document",documentId=>{
      navigate(`/document/${documentId}`);
    })
  }

  
  return (
        <div className='documents-display'>
            <div onClick={createDocument} className='document'>
                Create a new Document
            </div>
            {documents && documents.map(document=><div className='document'>{<Link to={`/document/${document._id}`}>{document._id}</Link>}</div>)}
        </div>
 
  )
}
