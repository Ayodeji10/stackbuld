import { useNavigate } from "react-router-dom";
import { AUTHORS, POSTS } from "../utils/routes";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container d-flex justify-content-center align-items-center gap-3">
        <h1 onClick={() => navigate("/")}>Stackbuld Blog</h1>
        <h6
          onClick={() => navigate(POSTS(1))}
          className={`${
            window.location.pathname.includes("posts") && "active" // add active class
          }`}
        >
          Posts
        </h6>
        <h6
          onClick={() => navigate(AUTHORS(1))}
          className={`${
            window.location.pathname.includes("authors") && "active" // add active class
          }`}
        >
          authors
        </h6>
      </div>
    </div>
  );
}

export default Navbar;
