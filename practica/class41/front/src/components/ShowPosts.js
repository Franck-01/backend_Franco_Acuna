import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const URI = "http://localhost:8080/api/users";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await axios.get(URI);
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`${URI}${id}`);
    getPosts();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/create" className="btn btn-outline-success">
            <BsPlusCircle />
          </Link>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>
                    <Link to={`/edit/${blog.id}`} className="btn btn-info">
                      <AiFillEdit />
                    </Link>
                    <button
                      onClick={() => deletePost(blog.id)}
                      className="btn btn-danger"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowPosts;
