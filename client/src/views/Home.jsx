import { Route, Routes } from "react-router-dom";
import UpdateLike from './components/UpdateLike';
import NewLike from './components/NewLike';
import ShowLike from './components/ShowLike';
const Home = () =>{
    return(
        <Routes>
        <Route path="/likes/like/new" element={<NewLike/>}/>
    
        <Route path="/likes/updateLike/:likeId" element={<UpdateLike/>}/>
        <Route path="/likes/showLike/:likeId" element={<ShowLike like/>}/>
       
        </Routes>
    )
}
export default Home;