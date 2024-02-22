import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Firstvisit from "./components/FirstVisit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/main",
      element: <Main />,
    },
    {
      path: "/firstvisit",
      element: <Firstvisit />,
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
