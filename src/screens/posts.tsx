import React, { useState } from "react";
import { getPosts } from "../utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BlogCard from "../components/blogCard";
import Pagination from "../components/pagination";
import { POSTS } from "../utils/routes";
import { postType } from "../types";

function Posts() {
  // page number
  const { page } = useParams();

  // fetch posts
  const {
    status,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts", { page: page }],
    keepPreviousData: false,
    queryFn: () => getPosts(page),
  });

  // searchbar input state
  const [searchParam, setSearchParam] = useState("");

  return (
    <div className="container posts">
      <div className="d-block d-md-flex justify-content-between align-items-center mb-5">
        <h2>Posts: Page {page}</h2>
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search posts on page 1"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {status === "loading" ? (
          // skeletal loader
          <>
            {Array.from(Array(6).keys()).map((i) => {
              return <BlogCard status={status} key={i} />;
            })}
          </>
        ) : (
          <>
            {searchParam !== "" ? (
              // show filtered list on input change
              <>
                {posts?.data.data
                  .filter((post: postType) =>
                    post.text.toLowerCase().includes(searchParam.toLowerCase())
                  )
                  .map((post: postType, i: number) => {
                    return <BlogCard post={post} key={i} status={status} />;
                  })}
              </>
            ) : (
              // show unfiltered list
              <>
                {posts?.data.data.map((post: postType, i: number) => {
                  return <BlogCard post={post} key={i} status={status} />;
                })}
              </>
            )}
          </>
        )}
      </div>
      {/* pagination  */}
      <Pagination
        page={page}
        posts={posts}
        status={status}
        pageRouter={POSTS}
        requiresPageSlug={false}
      />
    </div>
  );
}

export default Posts;
