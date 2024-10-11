import React, { useEffect, useState } from 'react'
import BlogCard  from './BlogCard'
const Blogs = () =>{
  const [blogs,setBlogs] = useState()
  const [keyword,setKeyword] = useState()
  const fetchBlogs = async () =>{
    const respblog = await fetch(`${import.meta.env.VITE_BASE_URL}/api/allblogs`);
    const alldata = await respblog.json()
    setBlogs(alldata.data)
    console.log(alldata)
  }
  const searcBlog = async (e)=>{
    event.preventDefault();
    const respblog = await fetch(`${import.meta.env.VITE_BASE_URL}/api/allblogs?keyword=`+keyword);
    const alldata = await respblog.json()
    setBlogs(alldata.data)
  }
  useEffect(()=>{
    fetchBlogs()
    
  },[])
  const resetSearch = ()=>{
    fetchBlogs()
    setKeyword('')
  }
    return(
        <div className='container'>
          <div className='d-flex justify-content-end pt-4 mb-4'>
            <form onSubmit={(e)=>searcBlog(e)}>
            <div className='d-flex'>
              <input type='text' className='form-control' placeholder='search blog' 
              value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
              <button className='btn btn-dark  ms-2'>Search</button>
              <button className='btn btn-dark  ms-2' onClick={()=>resetSearch()}>Reset</button>
            </div>
            </form>

          </div>
        <div className='d-flex justify-content-between pt-4 mb-4'>
          <h4>Blogs</h4>
          <a href="/create" className='btn btn-dark' >Create</a>
        </div>
        <div className='row'>
         
          {
            (blogs) && blogs.map((blog) => {
              return (<BlogCard blog={blog} key={blog.id} setBlogs={setBlogs} blogs={blogs} />)
            })
          }
          </div>
       

    </div>
    )

}

export default Blogs;