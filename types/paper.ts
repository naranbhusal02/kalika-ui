export interface Paper {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  category: string;
  class: string;
  subject: string;
  images: Array<{
    url: string;
    public_id: string;
    _id: string;
  }>;
  year: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface PaperResponse {
  statusCode: number;
  message: string;
  data: {
    papers: Paper[];
    currentPage: number;
    totalPages: number;
    totalPapers: number;
  };
  success: boolean;
}

