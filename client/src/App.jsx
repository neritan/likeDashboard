import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import UpdateLike from "./components/UpdateLike";
import NewLike from "./components/NewLike";
import ShowLike from "./components/ShowLike";
import "./App.css";

import "./components/styles/Like.css";
import Dashboard from "./components/Dashboard";

function App() {
  const [allLikes, setAllLikes] = useState([]);
  /*useEffect(() => {
    console.log("App......");
    loadLikes();
  }, []);
  const loadLikes = () => {
    getAll("http://localhost:3080/api/v1/likes")
      .then((res) => {
        console.log(res);
        setAllLikes(res.result);
      })
      .catch((err) => console.log(err));
  };*/
  return (
    <div className="App">
      <BrowserRouter>
        <Header allLikes={allLikes}/>

        <Routes>
          <Route path="/" element={<Dashboard allLikes={allLikes} setAllLikes={setAllLikes}/>} />
          <Route path="/likes/like/new" element={<NewLike />} />
          <Route path="/likes/updateLike/:likeId" element={<UpdateLike />} />
          <Route path="/likes/showLike/:likeId" element={<ShowLike allLikes={allLikes} setAllLikes={setAllLikes}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
