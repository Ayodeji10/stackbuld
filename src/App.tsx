import "./styles/styles.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./screens/posts";
import SinglePost from "./screens/singlePost";
import EditPost from "./screens/editPost";
import Navbar from "./components/navbar";
import Home from "./screens/home";
import SingleTag from "./screens/singleTag";
import Authors from "./screens/authors";
import AUthorPost from "./screens/authorPosts";
import ScrollToTop from "./scrollToTop";

function App() {
  return (
    <Router>
      {/* scroll page to top on load  */}
      <ScrollToTop />
      {/* navbar  */}
      <Navbar />
      <Routes>
        {/* routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/posts/page/:page" element={<Posts />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/tags/:tag/:page" element={<SingleTag />} />
        <Route path="/authors/page/:page" element={<Authors />} />
        <Route path="/authors/:authorId/:page" element={<AUthorPost />} />
      </Routes>
    </Router>
  );
}

export default App;
