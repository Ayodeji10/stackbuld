// post
export const POSTS = (page: number) => `/posts/page/${page}`;

// single post
export const SINGLE_POST = (id: string) => `/posts/${id}`;

// post editor
export const EDIT_POST = (id: any) => `/posts/${id}/edit`;

// posts under a tag
export const TAG_POSTS = (tag: string, page: number) => `/tags/${tag}/${page}`;

// authors
export const AUTHORS = (page: number) => `/authors/page/${page}`;

// posts under an author
export const AUTHOR_POSTS = (authorId: string, page: number) =>
  `/authors/${authorId}/${page}`;
