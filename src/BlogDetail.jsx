import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const BlogDetail = () =>{
    const [blog,setBlog] = useState([]);
    const params = useParams()
    const fetchBlog = async () =>{
        const detaildata = await fetch('http://127.0.0.1:8000/api/details/'+params.id);
        const resp = await detaildata.json()
        setBlog(resp.data)
        console.log(resp)
    }
    useEffect(() =>{
        fetchBlog()
    },[])
    return(
        <div className='container'>
        <div className='d-flex justify-content-between pt-4 mb-4'>
          <h4></h4>
          <a href="/" className='btn btn-dark' >Back</a>
        </div>
        <div className='row'>
            <div className='col-md-12'>
                <p>by {blog.author} on {blog.date}</p>

                {
                     (blog.image) && <img className="img-fluid" src={`http://127.0.0.1:8000/uploads/blogs/${blog.image} `} /> 
                }
                </div>
                <div>
                    {blog.description}
                </div>
          </div>
       

    </div>
    )
}


export default BlogDetail;