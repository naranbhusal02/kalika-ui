export interface User {
    _id: string;
    username: string;
    email: string;
    profileImage:string
    role: 'user' | 'admin';
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    googleId?: string;
  }
  
  export interface UsersResponse {
    success: boolean;
    data: {
      users: User[];
      currentPage: number;
      totalPages: number;
      totalUsers: number;
    };
  }
  
  