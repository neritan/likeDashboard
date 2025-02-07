import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./styles/NewLike.css";
import { deleteById } from "../service/BaseService";

const ShowLike = () => {
  //passing variables by Navigation and useLocation
  const like = useLocation().state;
  const navigate = useNavigate();
  console.log(like);

  const handleDeleteClick = () => {

    deleteById(`http://localhost:3080/api/v1/likes/${like._id}`)
    
    .catch((err) => console.log(err));
    navigate('/')
  };

  const handleEditClick = () => {
    navigate(`/likes/updateLike/${like._id}`, { state: like });
  };

  return (
    <div className="new-like-container">
      <div className="new-like-header">
        <h3>Like item</h3>
        <Link to="/" className="back-to-tasks">Back to Dashboard</Link>
      </div>
      <p>{like.title}</p>
      <p>{like.description}</p>
      <p>
        <b>Likes: </b>
        {like.likes}
      </p>
      <Grid container spacing={2}>
        <Grid>
          <button className="btn btn-delete" onClick={handleDeleteClick}>Delete</button>
        </Grid>
        <Grid>
          <button className="btn btn-update" onClick={handleEditClick}>Edit</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShowLike;
