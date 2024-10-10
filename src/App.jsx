import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Routes,Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import CreateBlog from './CreateBlog'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './BlogDetail'
import EditBlog from './EditBlog'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-dark text-center py-2 shadow-lg'>
    <h1 className='text-white'>React Laravel App</h1>
    </div>
    <Routes>
      <Route path='/' element={<Blogs />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/create' element={<CreateBlog />} />
      <Route path='/blog/:id' element={<BlogDetail />} />
      <Route path='/blog/edit/:id' element={<EditBlog />} />
    </Routes>
    <ToastContainer />
    
     
    </>
  )
}

export default App
