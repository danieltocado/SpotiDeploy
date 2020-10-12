import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom'
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-player";

import './Playlist.scss'

const spotify = new SpotifyWebApi();

const size = {
    width: '100%',
    height: '100%',
  };
  const view = 'coverart'; // or 'coverart'
  const theme = 'black'; // or 'white'

function Playlist() {

    const [playlist, setPlaylist] = useState();
    
    const { id } = useParams()

    useEffect(() => {
          spotify.getPlaylist(id).then((response) => {
            setPlaylist(response)
            console.log(response)
          }); 
      }, [id]);

    return (
      <div className="player">
        <div className="player_body">
          <Sidebar />
          <div className="playlist">
            <SpotifyPlayer
              uri={`spotify:playlist:`+playlist?.id}
              size={size}
              view={view}
              theme={theme}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Playlist
