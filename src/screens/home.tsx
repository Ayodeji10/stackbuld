import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { POSTS } from "../utils/routes";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(POSTS(1)); // redirect to posts page
  }, []);
  return <div></div>;
}

export default Home;
