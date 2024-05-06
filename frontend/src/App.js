//import React from "react";
const React = require("react");
/*
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
import Invitation from "./pages/invitation";
import Profile from "./pages/profile";
*/
const Login = require("./components/Login");
const Signup = require("./components/Signup");
const Main = require("./components/Main");
const Firstvisit = require("./pages/FirstVisit");
const NotFoundPage = require("./pages/NotFoundPage");
const MainLayout = require("./layouts/index");
const Questionair = require("./pages/questionair");
const Home = require("./pages/home");
const Recommendations = require("./pages/recommendations");
const Matches = require("./pages/matches");
const Invitation = require("./pages/invitation");
const Profile = require("./pages/profile");
/*
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
*/
const {
  createBrowserRouter,
  RouterProvider,
  redirect,
} = require("react-router-dom");


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
          path: "profile",
          element: <Profile />,
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
        {
          path: "invitation",
          element: <Invitation />,
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
