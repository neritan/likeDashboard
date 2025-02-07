import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getById, update } from "../service/BaseService";
import "./styles/NewLike.css";

const UpdateLike = () => {
  const likeId = useParams().likeId;
  const navigate = useNavigate();
  const [like, setLike] = useState({
    title: "",
    likes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("LikeId:", likeId);

    getById(`http://localhost:3080/api/v1/likes/${likeId}`)
      .then((res) => {
        console.log("Task data from server:", res);
        setLike({
          title: res.result.title || "",
          description: res.result.description || "",
          likes: res.result.likes,
          category: res.result.category,
        });
      })
      .catch((err) => console.log("Error fetching task:", err));
  }, [likeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLike({
      ...like,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const formError = validateForm(like);
    console.log(formError);
    setErrors(formError);

    if (Object.keys(formError).length === 0) {
      update(`http://localhost:3080/api/v1/likes/${likeId}`, like)
        .then((res) => {
          console.log(res);
          setLike(res);
          navigate("/");
        })

        .catch((err) => console.log(err));
      console.log("Form submitted successfully!");
    } else {
      console.log("Form submission failed due to validation errors.");
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

    if (!data.likes) {
      error.likes = "Likes is required";
    } else if (data.likes < 0) {
      error.likes = "Like must be an positive number";
    }
    return error;
  };

  return (
    <div className="new-like-container">
      <div className="new-like-header">
        <h3>Update Task</h3>
        <Link to="/">Back to Dashboad</Link>
      </div>
      <form onSubmit={handleSubmit}>
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
          <label>Likes</label>
          <input
            type="number"
            name="likes"
            value={like.likes}
            onChange={handleChange}
            required
          />
          {errors.likes && (
            <span className="error-message">{errors.likes}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default UpdateLike;
