import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import GamePage from "./screens/GamePage/GamePage";
import LandingPage from "./screens/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className="main">
        <Route path="/start" exact>
          <GamePage></GamePage>
        </Route>
        <Route path="/" exact>
          <LandingPage></LandingPage>
        </Route>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
