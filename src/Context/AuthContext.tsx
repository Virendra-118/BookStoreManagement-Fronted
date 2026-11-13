
import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
} from "react";

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: "Admin" | "Customer";
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  expiresAt: string | null;
}

type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        token: string;
        user: AuthUser;
        expiresAt: string;
      };
    }
  | { type: "LOGOUT" }
  | { type: "RESTORE_AUTH"; payload: AuthState };

const initialState: AuthState = {
  token: null,
  user: null,
  expiresAt: null,
};

const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        user: action.payload.user,
        expiresAt: action.payload.expiresAt,
      };

    case "LOGOUT":
      return initialState;

    case "RESTORE_AUTH":
      return action.payload;

    default:
      return state;
  }
};

interface AuthContextType {
  authState: AuthState;
  dispatch: Dispatch<AuthAction>;
  isInitializing: boolean;
}

export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    try {
      if (!token || !userData || !expiresAt) {
        throw new Error("Incomplete session");
      }

      const user: AuthUser = JSON.parse(userData);
      const expiryTime = new Date(expiresAt).getTime();

      if (
        !Number.isFinite(expiryTime) ||
        expiryTime <= Date.now() ||
        !user.id ||
        !user.fullName ||
        !user.email ||
        !["Admin", "Customer"].includes(user.role)
      ) {
        throw new Error("Invalid session");
      }

      dispatch({
        type: "RESTORE_AUTH",
        payload: { token, user, expiresAt },
      });
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
    } finally {
      setIsInitializing(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, dispatch, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
