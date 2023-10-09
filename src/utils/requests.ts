import axios from "axios";
import {
  GET_ALL_AUTHORS,
  GET_ALL_POSTS,
  GET_AUTHOR_POSTS,
  GET_SINGLE_POST,
  GET_TAGS,
  GET_TAG_POSTS,
} from "./endpoint";

const APP_ID = process.env.REACT_APP_APP_ID;

// get all posts
export const getPosts = async (page: any) => {
  const res = await axios.get(GET_ALL_POSTS(page), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res;
};

// get single post
export const getSinglePost = async (id: any) => {
  const res = await axios.get(GET_SINGLE_POST(id), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res.data;
};

// edit single post
export const editPost = async (id: any, data: any) => {
  const res = await axios.put(GET_SINGLE_POST(id), data, {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res.data;
};

// delete single post
export const deletePost = async (id: any) => {
  const res = await axios.delete(GET_SINGLE_POST(id), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res.data;
};

// get tags
export const getTags = async () => {
  const res = await axios.get(GET_TAGS(), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res;
};

// get posts under a tag
export const getTagPost = async (tag: any, page: any) => {
  const res = await axios.get(GET_TAG_POSTS(tag, page), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res;
};

// get authors
export const getAllAuthors = async (page: any) => {
  const res = await axios.get(GET_ALL_AUTHORS(page), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res;
};

// get posts under an author
export const getAuthorPosts = async (authorId: any, page: any) => {
  const res = await axios.get(GET_AUTHOR_POSTS(authorId, page), {
    headers: {
      "app-id": APP_ID,
    },
  });
  return res;
};
