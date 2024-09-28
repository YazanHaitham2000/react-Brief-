import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Courses from "./Pages/Courses.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import RedirectIfLoggedIn from "./Components/auth/RedirectIfLoggedIn.jsx"
function App() {
  const router = createBrowserRouter([

    {
      path: "/Courses",
      element: <Courses />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Login",
      element:<RedirectIfLoggedIn>
        <Login />
        </RedirectIfLoggedIn> ,
    },
      {
      path: "/Register",
      element:<RedirectIfLoggedIn>
        <Register />
      </RedirectIfLoggedIn> ,
    },
    {
      path: "/ForgetPassword",
      element:<RedirectIfLoggedIn>
        <ForgetPassword />
      </RedirectIfLoggedIn> ,
    },
    
   
  ]);
  return (
    <>
     <RouterProvider router={router} />
     </>
  );
}

export default App;
