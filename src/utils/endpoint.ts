import { PAGINATION_LENGHT } from "../constants";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GET_ALL_POSTS = (page: any) =>
  `${BASE_URL}/post?page=${page}&limit=${PAGINATION_LENGHT}`;

export const GET_SINGLE_POST = (id: any) => `${BASE_URL}/post/${id}`;

export const GET_TAGS = () => `${BASE_URL}/tag`;

export const GET_TAG_POSTS = (tag: any, page: any) =>
  `${BASE_URL}/tag/${tag}/post?page=${page}&limit=${PAGINATION_LENGHT}`;

export const GET_ALL_AUTHORS = (page: any) =>
  `${BASE_URL}/user?page=${page}&limit=${PAGINATION_LENGHT}`;

export const GET_AUTHOR_POSTS = (authorId: any, page: any) =>
  `${BASE_URL}/user/${authorId}/post`;
