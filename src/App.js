import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import Login from './Login';
import SuperAdmin from './SuperAdmin'
function App() {
  const [isauth, setIsauth] = useState(false)
  const [issuper, setIssuper] = useState("none")
  useEffect(() => {
    const session_data = localStorage.getItem('session')
    const dat = JSON.parse(session_data)
    if (dat) {
      setIsauth(true)
      setIssuper(dat[0].role)
      console.log(issuper)
    }
  })
  return (
    <div>
      <Routes>
      <Route path='*' element={<Dashboard/>}/>
        {
          issuper === 'none' && <Route path='/' element={<Login />} />
        }
        {
          issuper === 'Super' && <Route path='/' element={<SuperAdmin />} />
        }
        {
          issuper === 'Super' && <Route path='*' element={<SuperAdmin />} />
        }
        {
          issuper === 'Admin' ? <Route path='/dashboard' element={<Dashboard />} /> : <Route path='/dashboard' element={<SuperAdmin />} />
        }
        {
          issuper === 'Admin' ? <Route path='/' element={<Dashboard />} /> : <Route path='/' element={<SuperAdmin />} />
        }
        {
          issuper === 'Admin' ? <Route path='*' element={<Dashboard />} /> : <Route path='*' element={<SuperAdmin />} />
        }
      </Routes>
    </div>
  );
}

export default App;
