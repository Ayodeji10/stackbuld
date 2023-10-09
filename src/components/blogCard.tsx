import { getDate } from "../utils/utils";
import SkeletalLoader from "./skeletalLoader";
import { useNavigate } from "react-router-dom";
import { SINGLE_POST, TAG_POSTS } from "../utils/routes";

function BlogCard({ post, status }: any) {
  // navigator
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
      <div className="postCard">
        <div className="top">
          {status === "loading" ? (
            <SkeletalLoader height={180} width="100%" borderRadius={5} />
          ) : (
            <img src={post?.image} alt={post?.text} />
          )}
        </div>
        <div className="bottom">
          {status === "loading" ? (
            <SkeletalLoader height={15} width={150} borderRadius={5} />
          ) : (
            <div className="d-flex justify-content-between mb-1">
              <small>{getDate(post?.publishDate)}</small>
              <i
                className="fa-solid fa-arrow-right-long"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(SINGLE_POST(post?.id));
                }}
              />
            </div>
          )}
          {status === "loading" ? (
            <>
              <SkeletalLoader height={35} width="100%" borderRadius={5} />
              <SkeletalLoader height={35} width="70%" borderRadius={5} />
            </>
          ) : (
            <h4>{post?.text}</h4>
          )}
          <div className="d-flex flex-wrap mt-3">
            {status === "loading" ? (
              <>
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
                {post?.tags.map((tag: string, i: number) => {
                  return (
                    <span
                      key={i}
                      className="tag"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(TAG_POSTS(tag, 1));
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </>
            )}
          </div>
          <div className="card-foot d-flex justify-content-between align-items-center">
            {status === "loading" ? (
              <SkeletalLoader height={30} width={120} borderRadius={5} />
            ) : (
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-heart" />
                <span className="likes"> {post?.likes}</span>
              </div>
            )}
            {status === "loading" ? (
              <SkeletalLoader height={40} width={40} borderRadius="50%" />
            ) : (
              <div
                className="avatar"
                title={`${post?.owner?.title} ${post?.owner?.firstName} ${post?.owner?.lastName}`}
              >
                <img src={post?.owner?.picture} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
