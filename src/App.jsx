import React, { Component } from "react";

import "./App.css";
import User from "./Components/user";
import { BrowserRouter,Routes, Route } from "react-router-dom";

const App = ()=> {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/user" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}
 

export default App;