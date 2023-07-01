import './App.css';
import React from 'react';
import HomePage from './home/HomePage';
import CreateAccount from './bankoperations/CreateAccount';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import DeleteAccount from './bankoperations/DeleteAccount';
import ViewEditAccount from './bankoperations/ViewEditAccount';
import DepositAmount from './bankoperations/DepositAmount';
import ViewBalance from './bankoperations/ViewBalance';
import FundsTransfer from './bankoperations/FundsTransfer';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/allaccounts" component={ViewEditAccount}/>
        <Route path="/createAcc" component = {CreateAccount}/>
        <Route path="/depositAmount" component = {DepositAmount}/>
        <Route path="/viewBalance" component={ViewBalance}/>
        <Route path="/fundsTransfer" component={FundsTransfer}/>
        <Route path="/deleteAccount" component = {DeleteAccount}/>
      </Switch>
    </Router>
  );
}

export default App;
