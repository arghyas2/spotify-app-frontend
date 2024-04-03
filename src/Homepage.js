import React from 'react';
import './Homepage.css'; // For your custom styles

function HomePage() {
    return (
        <div className="home">
            <h1>Socializing through music made simple</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
}

export default HomePage;

function handleLogin() {
    // Redirect to your Flask app's login route
    const login_url = process.env.REACT_APP_LOGIN_URL;
    window.location.href = login_url;
}
