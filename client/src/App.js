import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import TextEditor from './components/TextEditor';
import Home from "./Home";
import './App.css';
import NotFound from "./NotFound";
import { useState, useEffect } from 'react';
import {io} from "socket.io-client"


function App() {
  const [socket,setSocket] = useState()

  // Step 1: Connecting to socket.io backend server
      useEffect(()=>{
        const socketServer = io("")
        setSocket(socketServer)

        return ()=>{
            socketServer.disconnect();  // RETURN IS BASICALLY USED TO DEFINE COMPONENT WILL UNMOUNT FUNCTION (for cleanup code)
        }
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/document/:id" element={<TextEditor socket={socket} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App;

//<Navigate to={`/document/${uuid()}`}/>