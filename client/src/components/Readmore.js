import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fade } from "react-awesome-reveal";
import { Link } from 'react-router-dom';
import { FiCornerDownRight, FiCornerDownLeft } from 'react-icons/fi';

/**
 *  Component matchs the params between author and post
 *  to render them in the page.
 */

const Readmore = (props) => {
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const slug = props.match.params.id;

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        alert('Error connection!')
      });
  }, [props.match.params.id]);

  useEffect(() => {
    const id = post.author;
  
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/authors/${id}`)
        .then(res => {
          setAuthor(res.data);
        })
        .catch(err => {
          alert('Error connection!')
        });
    }
  }, post.author);


  const createBlog = () => {
      return {__html: post.content};
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <Fade duration={1200}>
          <div className="p-4 p-md-5 text-light bg-primary row">
            <div className="col-md-12 px-0">
              <h1 className="text-white">{post.title}</h1>
              <h6 className="my-3 mt-5 text-white">{post.category}<FiCornerDownRight /></h6>
            </div>
          </div>
          {/* HTML rendered from backend to keep summernote styles */}
          <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <h6>Posted by: {author.name}</h6>
            <hr />
            <h5 className='p-1 p-md-1 mr-2'>{post.month} {post.day}</h5>
            <p className="p-2 p-md-2 mb-5"><Link to='/blog' className="font-weight-bold"><FiCornerDownLeft /> Back to Blogs</Link></p>
        </Fade>
      </div>
    </>
  );
}

export default Readmore;
