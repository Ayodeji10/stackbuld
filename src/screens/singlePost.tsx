import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { deletePost, getSinglePost } from "../utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getDate } from "../utils/utils";
import SkeletalLoader from "../components/skeletalLoader";
import { EDIT_POST, POSTS, SINGLE_POST, TAG_POSTS } from "../utils/routes";
import cogoToast from "cogo-toast";
import ButtonLoader from "../components/buttonLoader";

function SinglePost() {
  // page id
  const { id } = useParams();

  // navigator
  const navigate = useNavigate();

  // fetch single post
  const {
    status,
    error,
    data: post,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getSinglePost(id),
  });

  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDeletePost = async () => {
    setDeleteLoading(true);
    try {
      const res = await deletePost(id);
      cogoToast.success("Deleted Successfully");
      navigate(POSTS(1));
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container single-post">
      <div className="row">
        <div className="col-lg-8 col-12">
          {status === "loading" ? (
            <>
              <SkeletalLoader height={35} width="100%" borderRadius={5} />
              <SkeletalLoader height={35} width="70%" borderRadius={5} />
            </>
          ) : (
            <h2>
              {" "}
              <i
                className="fa-solid fa-arrow-left-long"
                onClick={() => navigate(-1)}
              ></i>
              {post?.text}
            </h2>
          )}
          {status === "loading" ? (
            <SkeletalLoader height={500} width="100%" borderRadius={5} />
          ) : (
            <div className="post-img">
              <img src={post?.image} alt={post?.text} />
            </div>
          )}
          <div className="d-flex justify-content-between">
            {status === "loading" ? (
              <SkeletalLoader height={20} width={70} borderRadius={5} />
            ) : (
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-heart"></i>
                <span className="likes"> {post?.likes}</span>
              </div>
            )}
            {status === "loading" ? (
              <SkeletalLoader height={30} width={150} borderRadius={5} />
            ) : (
              <small>{getDate(post?.publishDate)}</small>
            )}
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <div className="about mt-4 mt-md-4 mt-sm-4 mt-lg-0">
            <div className="top">About Post</div>
            <div className="middle">
              <div className="d-flex align-items-center mb-3r">
                {status === "loading" ? (
                  <SkeletalLoader
                    height={60}
                    width={60}
                    borderRadius="50%"
                    className="me-3"
                  />
                ) : (
                  <div className="avatar">
                    <img src={post?.owner?.picture} alt="" />
                  </div>
                )}
                <div>
                  <p>Author</p>
                  {status === "loading" ? (
                    <SkeletalLoader height={20} width={120} />
                  ) : (
                    <span className="title">{`${post?.owner?.title} ${post?.owner?.firstName} ${post?.owner?.lastName}`}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="bottom">
              <p>Tags</p>
              <div className="d-flex flex-wrap mt-3">
                {status === "loading" ? (
                  <>
                    {/* placeholder  */}
                    {Array.from(Array(3).keys()).map((i) => {
                      return (
                        <SkeletalLoader
                          key={i}
                          height={25}
                          width={50}
                          borderRadius={20}
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    {/* tags  */}
                    {post?.tags.map((tag: string, i: number) => {
                      return (
                        <span
                          key={i}
                          className="tag"
                          onClick={() => navigate(TAG_POSTS(tag, 1))}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {status === "loading" ? (
        <SkeletalLoader width={200} height={40} />
      ) : (
        <>
          <button onClick={() => navigate(EDIT_POST(id))} className="edit">
            <i className="fa-solid fa-pen"></i>Edit Post
          </button>
          <button
            type="button"
            className="delete"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa-solid fa-trash-can" />
            Delete Post
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Delete Post
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  You are about to permanently delete a post, do you wish to
                  proceed?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDeletePost}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <ButtonLoader size={23} color="#FFF" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SinglePost;
