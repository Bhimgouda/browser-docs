import {BrowserRouter as Router , Routes, Route, Navigate} from "react-router-dom"
import {v4 as uuid} from "uuid"
import TextEditor from './components/TextEditor';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to={`/document/${uuid()}`}/>} />
        <Route path="/document/:id" element={<TextEditor/>} />
      </Routes>
    </Router>
  )
}

export default App;