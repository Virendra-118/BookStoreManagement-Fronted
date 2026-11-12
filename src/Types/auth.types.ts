
// User information
export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Registration request
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

// Authentication state
export interface Authstate {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Authentication actions
export type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        user: AuthUser;
        token: string;
      };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "RESTORE_SESSION";
      payload: {
        user: AuthUser;
        token: string;
      } | null;
    };
