import React, { useState } from "react";
import { getAuthorPosts } from "../utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BlogCard from "../components/blogCard";
import { postType } from "../types";

function AUthorPost() {
  // author id and page
  const { authorId, page } = useParams();

  const {
    status,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["tagPosts", authorId, { page }],
    keepPreviousData: false,
    queryFn: () => getAuthorPosts(authorId, page),
  });

  return (
    <div className="container posts">
      <h2 className="mb-4">
        Posts by:{" "}
        <span>
          {status === "success" &&
            `${posts?.data.data[0].owner.title} ${posts?.data.data[0].owner.firstName} ${posts?.data.data[0].owner.lastName}`}
        </span>
      </h2>
      <div className="row">
        {status === "loading" ? (
          <>
            {/* skeletal loaders */}
            {Array.from(Array(6).keys()).map((i) => {
              return <BlogCard status={status} key={i} />;
            })}
          </>
        ) : (
          <>
            {posts?.data.data.map((post: postType, i: number) => {
              return <BlogCard post={post} key={i} status={status} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default AUthorPost;
