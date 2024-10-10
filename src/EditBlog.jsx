import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const EditBlog = () =>{
    const [html, setHtml] = useState('');
    const [imageId,setimageId] = useState();
    const navigate = useNavigate();
    const [blog,setBlog] = useState([]);
    const params = useParams()
    function onChange(e) {
        setHtml(e.target.value);
      }
      const handleFileChange = async (e) => { 
        const files = e.target.files;
        try {
            if (files && files[0]) {
                console.log("files f if", files);
                const file = files[0];
                const formData = new FormData();
                console.log("file", file);
                formData.append('image', file);
                console.log("formData", formData);
    
                const res = await fetch('http://127.0.0.1:8000/api/save-temp-image', {
                    method: 'POST',
                    body: formData
                });
                const result = await res.json(); // Await and assign the JSON result here
               // console.log("res------", result);
    
                if (result.status === false) {
                    alert(result.errors.image);
                    e.target.value = null;
                } else {
                    setimageId(result.image.id);
                    //console.log(result.image.id);
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    
    
    
      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();
      const formSubmit = async (data) =>{
       const newdata1 = {...data, "description":html}
     const newdata ={...newdata1, "image":imageId}
        console.log(newdata)
       const res = await fetch('http://127.0.0.1:8000/api/editblog/'+params.id,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newdata)
        });
        toast("Blog updated Successfully");
       navigate('/');
      }
      const fetchBlog = async () =>{
        const detaildata = await fetch('http://127.0.0.1:8000/api/details/'+params.id);
        const resp = await detaildata.json()
        setBlog(resp.data)
        setHtml(resp.data.description)
        reset(resp.data)
        console.log(resp)
    }
    useEffect(() =>{
        fetchBlog()
    },[])
    return(
        <div className='container'>
            <div className='d-flex justify-content-between pt-4 mb-4'>
                <h4>Create Blogs</h4>
                <a href="/" className='btn btn-dark' >Back</a>
                </div>
                <div className='card border-0 shadow-lg'>
                    <form onSubmit={handleSubmit(formSubmit)}>

                        <div className='card-body'>
                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label'>Title</label>
                                <input type='text' {...register('title',{required:true})} className='form-control' placeholder='Name' />
                                {errors.title && <span>This field is required</span>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='short' className='form-label'>ShortDesc</label>
                                <input type='text'  {...register('shortDesc',{required:true})} className='form-control' placeholder='ShortDesc' />
                                {errors.shortDesc && <span>This field is required</span>}

                            </div>

                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label'>Description</label>
                                <Editor containerProps={{ style: { resize: 'vertical' } }}
                                value={html} onChange={onChange} />
                                
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label'>Image</label>
                                <input type='file' onChange = {handleFileChange} className='form-control' />
                                {
                                    (blog.image) && <img className="img-fluid" src={`http://127.0.0.1:8000/uploads/blogs/${blog.image} `} /> 
                        }
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label'>Author</label>
                                <input type='text'  {...register('author',{required:true})} className='form-control' placeholder='Author' />
                                {errors.author && <span>This field is required</span>}
                            </div>
                            <button className='btn btn-dark'>Update</button>
                        </div>
                    </form>
        </div>

       </div>
    )

}
export default EditBlog;