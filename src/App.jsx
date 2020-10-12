import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Player from './components/Player/Player';
import Playlist from './components/Playlist/Playlist';
import Search from './components/Search/Search';
import { getToken } from './config/spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { GlobalHistory } from './history';


import './App.css';

const spotify = new SpotifyWebApi();

function App() {

  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState();
  const [discovery, setDiscovery] = useState();
  
  useEffect(() => {
    const hash = getToken();
    
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      setToken(_token)
      //localStorage.setItem('authToken',_token);
      spotify.setAccessToken(_token);
      
      spotify.getMe().then((_user) => {
        setUser(_user)
        console.log(_user)
      });

      spotify.getUserPlaylists().then((_playlists) => {
        setPlaylists(_playlists)
        console.log(_playlists)
      });

      spotify.getPlaylist('37i9dQZEVXcNKq2VjgiyOP').then((response) => {
        setDiscovery(response)
        console.log(response)
      });
    }
    
  }, []);

  return (
      <>

          <div className="app">

            {/* localStorage.getItem('authToken') token ? <Player spotify={spotify}/> : <Login/>*/} 

          </div>
        <BrowserRouter >

          <GlobalHistory />

          <Switch >
          {token ?
            <Route exact path="/home" component={Player}/>
            :
            <Route exact path="/" component={Login}/>
          } 
            <Route exact path="/playlist/:id" component={Playlist} />
            <Route exact path="/search" component={Search} />

          </Switch>

        </BrowserRouter>
      </>
  );
}

export default App;
