import { useState, useEffect } from 'react';
import { getAll, update } from "../service/BaseService";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Like.css";

const Dashboard = () => {
    const [allLikes, setAllLikes] = useState([]);
    const [like, setLike] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      console.log("App......")
      loadLikes();
    }, []);
  
    const loadLikes = () => {
      getAll("http://localhost:3080/api/v1/likes")
        .then((res) => {
          console.log(res)
          setAllLikes(res.result);
        })
        .catch((err) => console.log(err));
    };
  
    const handleLikeClick = (likeId) => {
      let like = allLikes.find(like => like._id === likeId);
      console.log(like)
      like.likes = like.likes + 1
      update(`http://localhost:3080/api/v1/likes/${likeId}`).then((res) => {like = res})
      .catch((err) => console.log(err));
    }
  
    const handleShowClick = (likeId) => {
      console.log(allLikes)
      const filtered = allLikes.find((like) => like._id === likeId);
      console.log('ketu: ' + filtered);
      navigate(`/likes/showLike/${likeId}`, {state: filtered})
      setLike(like);
    }
    return(
    <div className="likes-container">
      <h2 className="likes-title">Likes Dashboard</h2>

      <table className="likes-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Likes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allLikes.length > 0 ? allLikes.map((like) => {
            return (
              <tr key={like._id}>
                <td>{like.title}</td>
                <td>{like.category}</td>
                <td>{like.likes}</td>
                <td className="action-buttons">
                  <button onClick={() => handleShowClick(like._id)} className="btn btn-update">show</button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleLikeClick(like._id)}
                  >
                    Like
                  </button>
                </td>
              </tr>
            );
          }) : <tr><td colSpan="6" style={{textAlign: 'center'}}>No tasks found</td></tr>}
        </tbody>
      </table>
      <p className="add-like-link">
        <Link className="add-like-link" to={"likes/like/new"} >Dont see what you like? Add your own</Link>
      </p> 
      </div>
      )
}

export default Dashboard