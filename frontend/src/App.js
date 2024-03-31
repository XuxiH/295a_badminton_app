import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Firstvisit from "./pages/FirstVisit";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/index";
import Questionair from "./pages/questionair";
import Home from "./pages/home";
import Recommendations from "./pages/recommendations";
import Matches from "./pages/matches";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

const loader = () => {
  const useremail = sessionStorage.getItem("email");
  const username = sessionStorage.getItem("username");
  if (useremail && username) {
    return true;
  } else {
    return redirect("/login");
  }
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      loader: loader,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "firstvisit",
          element: <Firstvisit />,
        },
        {
          path: "questionair",
          element: <Questionair />,
        },
        {
          path: "recommendations",
          element: <Recommendations />,
        },
        {
          path: "matches",
          element: <Matches />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
