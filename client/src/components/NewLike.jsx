import { Link, useNavigate } from "react-router-dom";
import { create } from "../service/BaseService";

import { useState } from "react";
import "./styles/NewLike.css";

const NewLike = () => {
  const navigate = useNavigate();
  const [like, setLike] = useState({
    title: "",
    description: "",
    likes: "",
    category: "Person",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value} = e.target;
    console.log(name + ": "+ value)
    setLike({
      ...like,
      [name]: value,
    });
  };
  const newLikeHandle = (e) => {
    e.preventDefault();
    const formError = validateForm(like);
    console.log(like);
    setErrors(formError);
    if (Object.keys(formError).length === 0) {
      create("http://localhost:3080/api/v1/likes", like)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
        console.log('Form submitted successfully!');
    }
    else{
        
        console.log('Form submission failed due to validation errors.');
    }
  };

  const validateForm = (data) => {
    console.log(data);
    let error = {};
    if (!data.title.trim()) {
      error.title = "Title is required";
    } else if (data.title.length < 3) {
      console.log("I am here");
      error.title = "Title must be at last 3 characters";
    }

    if (!data.description.trim()) {
      error.description = "Description is required";
    } else if (data.description.length < 3) {
        error.description = "Description must be at last 3 characters";
    }
    return error;
  };

  return (
    <div className="new-like-container">
      <div className="new-like-header">
        <h3>Create New Task</h3>
        <Link to="/" className="back-to-tasks">
          Back to Tasks
        </Link>
      </div>
      <form onSubmit={newLikeHandle}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={like.title}
            onChange={handleChange}
            required
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={like.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={like.category}
            onChange={handleChange}
            required
          >
            <option value="Person">Person</option>
            <option value="Place">Place</option>
            <option value="Thing">Thing</option>
            <option value="Idea">Idea</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Create Like
        </button>
      </form>
    </div>
  );
};

export default NewLike;
