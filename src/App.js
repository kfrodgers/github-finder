import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import axios from "axios";
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const searchUsers = async (text) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUsers(res.data.items);
        setLoading(false);
    }

    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    }

    const getUserRepos = async (username) => {
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data);
    }

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    }

    const showAlert = (msg, type) => {
        setAlert({ msg, type })
        setTimeout(() => setAlert(null), 5000)
    }

    return (
        <Router>
        <div className="App">
            <Navbar />
            <div className={"container"}>
                <Alert alert={alert} />
                <Routes>
                    <Route exact path={'/'} element={
                        <Fragment>
                            <Search searchUsers={searchUsers} clearUsers={clearUsers}
                                    setAlert={showAlert} showClear={users.length > 0}/>
                            <Users loading={loading} users={users} />
                        </Fragment>
                        } />
                    <Route exact path={'/about'} element={<About />} />
                    <Route path={'/user'}>
                        <Route exact path={':login'} element={
                            <User user={user} loading={loading} repos={repos} getUser={getUser} getUserRepos={getUserRepos}/>
                        } />
                    </Route>
                </Routes>
            </div>
        </div>
        </Router>
    );
}

export default App;
