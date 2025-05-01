// types.ts
export interface User {
  _id: string;
  username: string;
  profileImage:string;
  avatar?: string;
}

export interface Reply {
  _id: string;
  text: string;
  user: User;
  createdAt: string;
}

export interface Comment {
  _id: string;
  text: string;
  user: User;
  createdAt: string;
  replies: Reply[];
}

export interface BlogContent {
  _id: string;
  text: string;
  order: number;
}

export interface BlogImage {
  _id: string;
  url: string;
  order: number;
}

export interface Blog {
  _id: string;
  titles: BlogContent[];
  contents: BlogContent[];
  images: BlogImage[];
  tags: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  author: User;
}