import React, { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { editPost, getSinglePost } from "../utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import TextEditor from "../components/editor";
import ButtonLoader from "../components/buttonLoader";
import cogoToast from "cogo-toast";
import { SINGLE_POST } from "../utils/routes";

function EditPost() {
  // post id
  const { id } = useParams();

  // navigator
  const navigate = useNavigate();

  // tiny editor ref
  const editorRef = useRef<any>(null);

  // fetch single post
  const {
    status,
    error,
    data: post,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getSinglePost(id),
  });

  // editor loading state and edot function
  const [editLoading, setEditLoading] = useState(false);
  const edit = async () => {
    setEditLoading(true);
    const data = {
      // rermove html tags frrom post
      text: editorRef.current.getContent().replace(/(<([^>]+)>)/gi, ""),
    };
    try {
      const res = await editPost(id, data);
      cogoToast.success("Changes Saved");
      navigate(SINGLE_POST(post?.id));
    } catch (error) {
      setEditLoading(false);
    }
  };

  return (
    <div className="container edit-post">
      <h2>
        <i
          className="fa-solid fa-arrow-left-long"
          onClick={() => navigate(SINGLE_POST(post?.id))}
        ></i>
        Edit Post
      </h2>
      {status === "loading" ? (
        <Skeleton width={200} height={40} />
      ) : (
        <>
          {/* tiny editor  */}
          <TextEditor editorRef={editorRef} initialValue={post.text} />
          <button onClick={edit}>
            {editLoading ? (
              <ButtonLoader size={23} color="white" />
            ) : (
              "Save changes"
            )}
          </button>
        </>
      )}
      {/* disclaimer  */}
      <div className="notice">
        <p>
          Please note, only the text of a post can be edited, as this is just a
          test project
        </p>
      </div>
    </div>
  );
}

export default EditPost;
