import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom'
import SpotifyWebApi from "spotify-web-api-js";
import './Playlist.scss'

const spotify = new SpotifyWebApi();

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
                <Sidebar/>
            <div className="playlist">
            <p>Soy la playlist {playlist?.name}</p>
        </div>
            </div>
                <Footer/>
        </div>
        
    )
}

export default Playlist
