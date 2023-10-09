import React from "react";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
