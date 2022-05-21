import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Welcome from './Components/Welcome';
import Render from './Components/Render';
import Home from './Components/Home';
function App() {
  return (
   <>
  <Router>
  

    <Routes>
    <Route exact path='/' element={<Welcome/>}/>
    <Route exact path='/backup' element={<Sidebar/>}/>
  {/*<Route path='*' element={<Render/>}/>*/}
    <Route path='/home' element={<Home/>}/>
    </Routes>

    </Router>

    </>
  );
}

export default App;
