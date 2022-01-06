import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import GamePage from "./screens/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className="main">
        <Route path="/start" exact>
          <GamePage></GamePage>
        </Route>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
