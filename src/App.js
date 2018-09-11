import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import EditPage from "./components/EditPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LoginPage} />
          <Route path="/edit" component={EditPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
