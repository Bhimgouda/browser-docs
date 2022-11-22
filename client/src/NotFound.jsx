import React from 'react'
import {v4 as uuid} from "uuid"

export default function NotFound() {
  return (
    <React.Fragment>
        <div style={{textAlign:"center",marginTop:"50px", fontSize:"30px"}}>Sorry, the file you have requested does not exist.</div>
        <div style={{textAlign:"center", fontSize:"15px"}}>Make sure that you have the correct URL and that the file exists.</div>
        
        <div style={{margin:"20px auto",width:"400px",height:"100px",border:"2px solid grey", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <a href={`document/${uuid()}`}> Create a new Document Instead </a>
            </div>
    </React.Fragment>
  )
}
