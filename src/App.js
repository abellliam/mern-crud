import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import clientItemList from "./components/client.item-list.component";
import clientEditItem from "./components/client.edit-item.component";
import clientCreateItem from "./components/client.create-item.component";
import clientDeleteItem from "./components/client.delete-item.component";

import transactionItemList from "./components/transaction.item-list.component";
import transactionEditItem from "./components/transaction.edit-item.component";
import transactionCreateItem from "./components/transaction.create-item.component";
import transactionDeleteItem from "./components/transaction.delete-item.component";

import rateItemList from "./components/rate.item-list.component";
import rateEditItem from "./components/rate.edit-item.component";
import rateCreateItem from "./components/rate.create-item.component";
import rateDeleteItem from "./components/rate.delete-item.component";

import MonthlyProcessing from "./components/monthly-processing.component";
import MonthlyReport from "./components/monthly-report.component";
import ClientReport from "./components/client-report.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://github.com/abellliam">Liam Abell</a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <p>{'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</p>
                </li>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Clients</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/transaction" className="nav-link">Transactions</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/rate" className="nav-link">Interest rates</Link>
                </li>
                <li className="navbar-item">
                  <p>{'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</p>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">New Client</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/transaction/create" className="nav-link">New Transaction</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/rate/create" className="nav-link">New Rate</Link>
                </li>
                <li className="navbar-item">
                  <p>{'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</p>
                </li>
                <li className="navbar-item">
                  <Link to="/processing" className="nav-link">Processing</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/monthly" className="nav-link">Monthly</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/client" className="nav-link">Client</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={clientItemList} />
          <Route path="/edit/:id" component={clientEditItem} />
          <Route path="/create" component={clientCreateItem} />
          <Route path="/delete/:id" component={clientDeleteItem} />

          <Route path="/transaction" exact component={transactionItemList} />
          <Route path="/transaction/edit/:id" component={transactionEditItem} />
          <Route path="/transaction/create" component={transactionCreateItem} />
          <Route path="/transaction/delete/:id" component={transactionDeleteItem} />

          <Route path="/rate" exact component={rateItemList} />
          <Route path="/rate/edit/:id" component={rateEditItem} />
          <Route path="/rate/create" component={rateCreateItem} />
          <Route path="/rate/delete/:id" component={rateDeleteItem} />

          <Route path="/processing" component={MonthlyProcessing} />
          <Route path="/monthly" component={MonthlyReport} />
          <Route path="/client" component={ClientReport} />

        </div>
      </Router>
    );
  }
}

export default App;