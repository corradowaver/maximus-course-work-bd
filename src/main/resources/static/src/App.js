import './App.css';
import Header from './Header';
import {Route, BrowserRouter, Redirect} from 'react-router-dom'
import Warehouses from "./Warehouses";
import Goods from "./Goods";
import Sales from "./Sales";
import React from "react";
import Demand from "./Demand";
import {AppBar, Switch, Toolbar} from "@material-ui/core";
import Login from "./Login";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <React.Fragment>
                      <AppBar position="fixed">
                        <Header/>
                        </AppBar>
                        <Toolbar />
                    </React.Fragment>

                  <Route exact path="/">
                      <Redirect to="/warehouses" />
                  </Route>
                  <Route exact path="/login">
                      <Login />
                  </Route>
                  <Route path="/goods">
                      <Goods />
                  </Route>
                  <Route path="/warehouses">
                      <Warehouses warehouseNumber = "1"/>
                      <Warehouses warehouseNumber = "2"/>
                  </Route>
                  <Route path="/sales">
                      <Sales/>
                  </Route>
                  <Route path="/demand:id">
                      <Demand/>
                  </Route>

              </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
