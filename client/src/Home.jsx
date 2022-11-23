import React, { useEffect } from 'react'
import {v4 as uuid} from "uuid"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"

export default function Home() {
  const [documents,setDocuments] = useState(['s','ss']);
  const navigate = useNavigate();


  useEffect(()=>{
    const getUserDocuments = async()=>{
      const {data:docs} = await axios.get('api/get-user-documents');
      setDocuments(docs);
    }
    getUserDocuments()
  },[])

  const createDocument = async()=>{
    const {data:document} = await axios.get("/api/create-document")
    console.log(document._id)
    navigate(`document/${document._id}`);
  }

  
  return (
        <div className='documents-display'>
            <div onClick={createDocument} className='document'>
                Create a new Document
            </div>
            {documents.map(document=><Link to={`/document/${document._id}`}><div className='document'>{document._id}</div></Link>)}
        </div>
  )
}
