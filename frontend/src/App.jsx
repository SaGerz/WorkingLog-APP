import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TaskForm from './pages/TaskForm'
import TaskList from './pages/TaskList'
import LoginForm from './pages/LoginForm'
import Register from './pages/RegisterForm'
import HomeRedirect from './pages/HomeRedirect'
import TaskUpdate from './pages/TaskUpdate'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeRedirect />}/>
      <Route path='/Register' element={<Register />}/>
      <Route path='/Login' element={<LoginForm />}/>
      <Route path='/TaskForm' element={<TaskForm />}/>
      <Route path='/TaskList' element={<TaskList />}/>
      <Route path='/Task-Update/:id' element={<TaskUpdate />}/>
    </Routes>    
  )
}

export default App
