import {BrowserRouter as Router , Routes, Route, Navigate} from "react-router-dom"
import TextEditor from './components/TextEditor';
import Home from "./Home";
import './App.css';
import NotFound from "./NotFound";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/document/:id" element={<TextEditor/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App;

//<Navigate to={`/document/${uuid()}`}/>