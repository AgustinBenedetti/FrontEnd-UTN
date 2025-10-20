import React from 'react'
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import HomeScreen from './screens/HomeScreen/HomaScreen'
import { Route, Routes } from 'react-router'
import AuthMiddleware from './Middleware/AuthMiddleware.jsx'




function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route element={<AuthMiddleware/>}>
          <Route path="/home" element={<HomeScreen />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App