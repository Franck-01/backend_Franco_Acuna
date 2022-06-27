import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = "http://localhost:8080/api/users";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    await axios.put(URI + id, {
      title,
      content,
    });
    navigate("/");
  };

  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    const res = await axios.get(URI + id);
    setTitle(res.data.title);
    setContent(res.data.content);
  };

  return (
    <div>
      <h3>Edit POST</h3>
      <form onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
          <label className="form-label">Content</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="textarea"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Modify
        </button>
      </form>
    </div>
  );
};

export default EditPost;
