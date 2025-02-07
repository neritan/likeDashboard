import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import UpdateLike from "./components/UpdateLike";
import NewLike from "./components/NewLike";
import ShowLike from "./components/ShowLike";
import "./App.css";

import "./components/styles/Like.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/likes/like/new" element={<NewLike />} />
          <Route path="/likes/updateLike/:likeId" element={<UpdateLike />} />
          <Route path="/likes/showLike/:likeId" element={<ShowLike />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
