import { Link, useNavigate } from "react-router-dom";
import { create  } from "../service/BaseService";

import { useState } from "react";
import './styles/NewLike.css'

const NewLike = () => {

    const navigate = useNavigate();
    const [like, setLike] = useState({
        title: '',
        description: '',
        likes: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setLike({
            ...like,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const newLikeHandle = e => {
        e.preventDefault();

        create('http://localhost:3080/api/v1/likes', like)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="new-like-container">
            <div className="new-like-header">
                <h3>Create New Task</h3>
                <Link to="/" className="back-to-tasks">Back to Tasks</Link>
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
    )
}

export default NewLike;