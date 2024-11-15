import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Table from './components/Table'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/:id' element={<Form />} />
        <Route path='/show' element={<Table />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
