import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const URL = "http://localhost:8081/posts";
const URL = "http://localhost:8080/api/users";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const send = async (e) => {
    e.preventDefault();
    await axios.post(URL, { title, content });
    navigate("/");
  };

  return (
    <div>
      <h3>CreatePost</h3>
      <form onSubmit={send}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
          <label className="form-label">Apellido</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="textarea"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
