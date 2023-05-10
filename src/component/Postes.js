import React, { useState } from 'react';
import "./Postes.css";
import { useDispatch, useSelector } from 'react-redux';
import { addPost,deletePost,updatePost } from '../redux/postsSlice';

export default function Postes() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isEdit,setEdit]=useState(false);
  const [id,setid]=useState(null);
  const [updatedTitle,setUpTitle]=useState("");
  const [updatedDesc,setUpDesc]=useState("");

  const posts = useSelector((state) => state.posts.items);
  const dispatch = useDispatch();

  return (
    <div className='form'>
      <input type="text"
      value={title}
       onChange={(e) => setTitle(e.target.value)} placeholder="Entrer post title"/>
      <input type="text" 
      value={desc}
      onChange={(e) => setDesc(e.target.value)} placeholder="Entrer post Desc"/>
      <button onClick={() => {
          dispatch(addPost({
            id: posts.length +1,
            title,
            desc,
          }))
          setTitle("");
          setDesc("")
        }}>ADD post</button>
      <div className='posts'>
        {
          posts.length > 0 ?
            posts.map(post =>
              <div className="post" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
                <button onClick={()=>
                {setEdit(true)
                  setid(post.id)
                }
                }>Edit</button>
                <button onClick={()=> dispatch(deletePost({id:post.id}))}>Delete</button> 
                 <br />
                 {isEdit && id===post.id && (
                 <>
                  <input type="text" 
                  onChange={(e)=>setUpTitle(e.target.value)}
                  placeholder="update title"/>
                  <input type="text" 
                  onChange={(e)=>setUpDesc(e.target.value)}
                  placeholder="updated desc" />
                  <button onClick={()=>{
                    dispatch(updatePost({id:post.id,title:updatedTitle,desc:updatedDesc}))
                    setEdit(false)
                  }}>update</button>
                  </>                  
                 )}
              </div>        
            )
          : 'no posts'
        }
      </div>
    </div>
  );
}
