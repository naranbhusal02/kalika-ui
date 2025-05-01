export interface User {
    id: string;
    email: string;
    username?: string;
    role: string;
    profileImage:string
    googleId?: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    userId:string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    googleLogin: () => void;
    getProfile: () => Promise<void>;
  }