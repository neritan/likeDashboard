import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getById, update } from "../service/BaseService";
import "./styles/NewLike.css";

const UpdateLike = () => {
    const likeId = useParams().likeId;
    const navigate = useNavigate();
    const [like, setLike] = useState({
        title: '',
        likes: ''
    });

    useEffect(() => {
        console.log("LikeId:", likeId);

 
     
         getById(`http://localhost:3080/api/v1/likes/${likeId}`)
             .then((res) => {
                 console.log("Task data from server:", res);
                 setLike({
                     title: res.result.title || '',
                     description: res.result.description || '',
                     likes: res.result.likes,
                     category: res.result.category
                 });
             })
             .catch((err) => console.log("Error fetching task:", err));
        }, [likeId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLike({
            ...like,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(like);
        update(`http://localhost:3080/api/v1/likes/${likeId}`, like)
            .then((res) => {
                console.log(res)
                setLike(res)
                navigate("/");
            })
            .catch((err) => console.log(err));

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
                </div>
                

                <button type="submit" className="submit-button">
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default UpdateLike;