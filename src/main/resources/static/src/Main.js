import React, { Component } from "react";
import { Switch, Route, BrowserRouter} from 'react-router-dom'
import Warehouses from "./Warehouses";
import Goods from "./Goods";

const Main = () => (
    <React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Warehouses}/>
                <Route path='/goods' component={Goods}/>
            </Switch>
        </BrowserRouter>
    </React.Fragment>
);

export default Main;
