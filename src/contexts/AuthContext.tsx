import React, { createContext, useContext, useReducer, useEffect } from "react";
import { User, AuthState, LoginCredentials, RegisterData } from "@/types/auth";
import { apiService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  // ✅ Restore user from localStorage if exists
  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user: User = JSON.parse(userData);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        localStorage.removeItem("user_data");
      }
    }
  }, []);

  // ✅ Login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response: {
        username: string;
        email: string;
        role: string;
        message: string;
      } = await apiService.login(credentials);

      const user: User = {
        username: response.username,
        email: response.email,
        role: response.role,
      };

      localStorage.setItem("user_data", JSON.stringify(user));

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast({
        title: "Success",
        description: "Login successful!",
      });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // ✅ Register function
  const register = async (data: RegisterData) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response: {
        username: string;
        email: string;
        role: string;
        message: string;
      } = await apiService.register(data);

      const user: User = {
        username: response.username,
        email: response.email,
        role: response.role,
      };

      localStorage.setItem("user_data", JSON.stringify(user));

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast({
        title: "Success",
        description: "Registration successful!",
      });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("user_data");
    dispatch({ type: "LOGOUT" });
    toast({
      title: "Success",
      description: "Logout successful!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
