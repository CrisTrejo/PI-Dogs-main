import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './Components/Landing.jsx'
import Home from './Components/Home';
import Create from './Components/Create'
import Details from './Components/Details';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element= {<Landing/>}/>
    <Route path = '/home' element = {<Home/>}/>
    <Route path="/dogs" element={<Create/>}/>
    <Route path="/home/:id" element={<Details/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
