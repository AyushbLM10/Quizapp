
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from './components/User';
import { Admin } from './components/Admin';
// import Landing from './components/Landing';

function App() {


  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path='/' element={<Landing/>}> */}
            <Route path="admin" element={<Admin />} />
            <Route path="user" element={<User />} />
          {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
