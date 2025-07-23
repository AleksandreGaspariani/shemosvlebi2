import { React } from 'react'
import Dashboard from './page/dashboard/Dashboard'
import {Router, Route, Routes, RouterProvider, BrowserRouter, Outlet} from 'react-router-dom'
import NavRoutes from './components/NavRoutes'
import UserPanel from './page/userPanel/UserPanel'
import Branches from './page/branch/Branch'

function App() {

  return (
      <div style={{ margin: '0 !important'}}>
        <BrowserRouter>
          <NavRoutes />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/userPanel" element={<UserPanel />} />
          </Routes>
          {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px'}}>
            <div>
              <ul style={{display: 'flex', flexDirection: 'column', listStyleType: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}>
                  <a href="/">Home</a>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <a href="/userPanel">UserPanel</a>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <a href="/branches">Branches</a>
                </li>
              </ul>
            </div>
            <div style={{width: "80%"}}>
              <Outlet />
            </div>
          </div> */}

        </BrowserRouter>
    </div>
    
  )
}

export default App
