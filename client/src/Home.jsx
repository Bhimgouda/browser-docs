import React from 'react'
import {v4 as uuid} from "uuid"
import { useNavigate } from 'react-router-dom';

export default function Home({socket}) {
  const navigate = useNavigate();

  const createDocument = ()=>{
    const documentId = uuid()
    socket.emit("create-document", documentId)
    navigate(`/document/${documentId}`);
  }

  
  return (
        <div className='documents-display'>
            <div onClick={createDocument} className='document'>
                Create a new Document
            </div>
        </div>
 
  )
}
