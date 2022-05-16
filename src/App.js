import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Welcome from './Components/Welcome';
import Render from './Components/Render';
function App() {
  return (
   <>
  <Router>
  
    <Sidebar />
    <Routes>
    <Route exact path='/' element={<Welcome/>}/>
    <Route path='*' element={<Render/>}/>
    </Routes>
    </Router>

    </>
  );
}

export default App;
