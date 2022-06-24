import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import './App.css';

const App = () => {

    return (
        <GithubState>
        <AlertState>
            <Router>
            <div className="App">
                <Navbar />
                <div className={"container"}>
                    <Alert alert={alert} />
                    <Routes>
                        <Route exact path={'/'} element={
                            <Fragment>
                                <Search />
                                <Users />
                            </Fragment>
                            } />
                        <Route exact path={'/about'} element={<About />} />
                        <Route path={'/user'}>
                            <Route exact path={':login'} element={
                                <User />
                            } />
                        </Route>
                    </Routes>
                </div>
            </div>
            </Router>
        </AlertState>
        </GithubState>
    );
}

export default App;
