import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

const useLogout = () => {
  const { setAuth } = useAuth(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    // Clear auth state
    setAuth({});
    
    // Clear localStorage
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    
    // Navigate to login
    navigate("/login");
    
    console.log("User logged out successfully");
  };

  return logout;
};

export default useLogout;