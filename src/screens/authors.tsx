import React, { useState } from "react";
import { getAllAuthors } from "../utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import Pagination from "../components/pagination";
import { POSTS, AUTHORS, AUTHOR_POSTS } from "../utils/routes";
import SkeletalLoader from "../components/skeletalLoader";
import { authorType } from "../types";

function Authors() {
  // page number
  const { page } = useParams();

  // fetch authour on specified page
  const {
    status,
    error,
    data: authors,
  } = useQuery({
    queryKey: ["authors", { page: page }],
    keepPreviousData: false,
    queryFn: () => getAllAuthors(page),
  });

  //   searchbar state
  const [searchParam, setSearchParam] = useState("");

  return (
    <div className="container authors">
      <div className="d-block d-md-flex justify-content-between align-items-center mb-5">
        <h2>Authors: Page {page}</h2>
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search post on page 1"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {status === "loading" ? (
          <>
            {/* place holders  */}
            {Array.from(Array(30).keys()).map((i) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                  <div className="author">
                    <div className="d-flex align-items-center">
                      <div className="avatar">
                        <SkeletalLoader
                          width={45}
                          height={45}
                          borderRadius="50%"
                        />
                      </div>
                      <div>
                        <h5>Author</h5>
                        <SkeletalLoader
                          width={200}
                          height={15}
                          borderRadius={5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <>
              {searchParam !== "" ? (
                <>
                  {/* filtered authors  */}
                  {authors?.data.data
                    .filter((author: authorType) =>
                      `${author.title} ${author.firstName} ${author.lastName}`
                        .toLowerCase()
                        .includes(searchParam.toLowerCase())
                    )
                    .map((author: authorType, i: number) => {
                      return (
                        <div
                          className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center"
                          key={i}
                        >
                          <Link
                            to={AUTHOR_POSTS(author.id, 1)}
                            className="author"
                          >
                            <div className="d-flex align-items-center">
                              <div className="avatar">
                                <img src={author.picture} alt="" />
                              </div>
                              <div>
                                <h5>Author</h5>
                                <p>
                                  {`${author.title} ${author.firstName} ${author.lastName}`}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </>
              ) : (
                <>
                  {/* unfiltered authors  */}
                  {authors?.data.data.map((author: authorType, i: number) => {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center"
                        key={i}
                      >
                        <Link
                          to={AUTHOR_POSTS(author.id, 1)}
                          className="author"
                        >
                          <div className="d-flex align-items-center">
                            <div className="avatar">
                              <img src={author.picture} alt="" />
                            </div>
                            <div>
                              <h5>Author</h5>
                              <p>
                                {`${author.title} ${author.firstName} ${author.lastName}`}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          </>
        )}
      </div>
      <Pagination
        page={page}
        posts={authors}
        status={status}
        pageRouter={AUTHORS}
      />
    </div>
  );
}

export default Authors;
