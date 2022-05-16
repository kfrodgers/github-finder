import React, {Component, Fragment} from 'react';
import { Routes, BrowserRouter as Router, Route  } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import axios from "axios";
import './App.css';

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null
    }

    async componentDidMount() {
        // this.setState({ loading: true });
        // const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // this.setState({ loading: false, users: res.data});
    }

    searchUsers = async (text) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ loading: false, users: res.data.items });
    }

    getUser = async (username) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/search/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ loading: false, user: res.data });
    }

    clearUsers = () => {
        this.setState({ loading: false, users: [] });
    }

    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type }});

        setTimeout(() => this.setState({ alert: null }), 5000)
    }

    render() {
        const { users, user, loading } = this.state;

        return (
            <Router>
            <div className="App">
                <Navbar />
                <div className={"container"}>
                    <Alert alert={this.state.alert} />
                    <Routes>
                        <Route exact path={'/'} element={
                            <Fragment>
                                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                                        setAlert={this.setAlert} showClear={users.length > 0}/>
                                <Users loading={loading} users={users} />
                            </Fragment>
                            } />
                        <Route exact path={'/about'} element={<About />} />
                        <Route path={'/user'}>
                            <Route exact path={':login'} element={
                                <User user={user} loading={loading} getUser={this.getUser} />
                            } />
                        </Route>
                    </Routes>
                </div>
            </div>
            </Router>
        );
    }
}

export default App;
