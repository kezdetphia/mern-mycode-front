import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './Pages/Home'
import Navbar from './Components/Navbar'

function App() {
  return (
    <div className='bg-background h-screen'>
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='' element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
