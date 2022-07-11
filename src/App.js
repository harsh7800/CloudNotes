import Navbar from "./components/Navbar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.scss'
import Home from "./components/Home";
import MyNotes from './components/MyNotes'
import Pricing from './components/Pricing'
import NoteState from "./components/context/notes/NoteState";

function App() {
  return (
    <NoteState>
    <BrowserRouter>
    <div className="App">
        <Navbar/>
        
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mynotes" element={<MyNotes/>} />
          <Route path="/pricing" element={<Pricing/>} />
        </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
  );
}



export default App;
