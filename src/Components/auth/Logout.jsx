import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";

const Logout = ({ children }) => {
  const { currentUser, dispatch } = useContext(AuthContext);
  console.log(currentUser); // This should log the user object if logged in

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });

    // Ensure you are removing the correct key that was set in localStorage
    localStorage.removeItem("user"); // Make sure 'user' is used as per AuthContext
  };

  return currentUser ? (
    <button className="btn btn-danger" onClick={logout}>
      Logout
    </button>
  ) : (
    children
  );
};

export default Logout;
