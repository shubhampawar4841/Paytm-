import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {Signup} from './pages/SignUp'
import {Signin} from './pages/Signin'
import { SendMoney} from './pages/SendMoney'
import { DashBoard } from "./pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
