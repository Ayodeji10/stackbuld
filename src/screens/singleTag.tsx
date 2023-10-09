import React, { useState } from "react";
import { getTagPost } from "../utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BlogCard from "../components/blogCard";
import Pagination from "../components/pagination";
import { TAG_POSTS } from "../utils/routes";
import { postType } from "../types";

function SingleTag() {
  // page tag and number
  const { tag, page } = useParams();

  // fetch post under tag
  const {
    status,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["tagPosts", { tag }, { page }],
    keepPreviousData: false,
    queryFn: () => getTagPost(tag, page),
  });

  return (
    <div className="container posts">
      <h2 className="mb-4">Posts under tag: {tag}</h2>
      <div className="row">
        {status === "loading" ? (
          <>
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
      {/* pagination  */}
      <Pagination
        page={page}
        posts={posts}
        status={status}
        pageRouter={TAG_POSTS}
        requiresPageSlug={true}
        slug={tag}
      />
    </div>
  );
}

export default SingleTag;
