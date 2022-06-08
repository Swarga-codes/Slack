import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Welcome from './Components/Welcome';
import Render from './Components/Render';
import Home from './Home';
import Backup from './Components/Backup';
import AddData from './Components/AddData';
function App() {
  return (
   <>
  <Router>
  
   
    <Routes>
    <Route exact path='/' element={<Home/>}/>
  <Route path='*' element={<Render/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/adddata' element={<AddData/>}/>

    </Routes>

    </Router>

    </>
  );
}

export default App;
