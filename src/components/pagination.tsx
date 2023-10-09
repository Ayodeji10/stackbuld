import { PAGINATION_LENGHT } from "../constants";
import { useNavigate } from "react-router-dom";

function Pagination({
  page, // page number
  posts, // pagination data
  status, // loading status
  pageRouter, // route to go on button click
  requiresPageSlug, // if route requires more than one paran
  slug, // second param (where applicable )
}: any) {
  // navigator
  const navigate = useNavigate();

  return (
    <div className="pagination d-flex flex-wrap justify-content-center align-items-center">
      {status === "success" && (
        <>
          {/* page text  */}
          <p className="mb-0 mx-3">
            Showing {PAGINATION_LENGHT * Number(page) - PAGINATION_LENGHT + 1}{" "}
            to{" "}
            {PAGINATION_LENGHT * Number(page) -
              PAGINATION_LENGHT +
              PAGINATION_LENGHT <
            posts.data.total - 30
              ? PAGINATION_LENGHT * Number(page) -
                PAGINATION_LENGHT +
                PAGINATION_LENGHT
              : posts.data.total - 30}{" "}
            of {posts.data.total - 30} items
            {/* Please note that the dummy api returns data in excess of 30 (30 more than what is in their data base), hence why i subtract 30 from the total number of items  */}
          </p>
          {/* page buttons  */}
          {Array.from(
            Array(Math.ceil((posts.data.total - 30) / PAGINATION_LENGHT)).keys()
          ).map((button, i) => {
            return (
              <button
                key={i}
                className={`${i + 1 === Number(page) && "active"}`}
                onClick={() =>
                  navigate(
                    requiresPageSlug
                      ? pageRouter(slug, i + 1)
                      : pageRouter(i + 1)
                  )
                }
              >
                {i + 1}
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Pagination;
