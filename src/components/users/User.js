import React, { Component } from "react";
import { useParams } from 'react-router-dom'

const User = ({ getUser, user, loading} ) => {

    const { path } = useParams();
    const { name, avatar_url, location, bio,
        blog, login, html_url, followers, following,
        public_repos, public_gists, hireable } = getUser();
    if (!loading && !name) getUser(path);

    return (
        <div>
            {loading ? user.name : 'loading...'}
         </div>
    );
}

export default User;