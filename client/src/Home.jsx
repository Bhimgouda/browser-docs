import React from 'react'
import {v4 as uuid} from "uuid"

export default function Home() {
  return (
  
        <div className='documents-display'>
            <a href={`document/${uuid()}`}>
                <div className='document'>
                Create a new Document
            </div>
            </a>
        </div>
 
  )
}
