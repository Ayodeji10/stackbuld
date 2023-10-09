export type authorType = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
};

export type postType = {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  owner: authorType;
};
