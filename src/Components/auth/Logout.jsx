import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import ProfileOut from "../ProfileOut.jsx";

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
   <ProfileOut fin = {logout} />
  ) : (
    children
  );
};

export default Logout;
