import React, { useEffect, useState } from "react";
import "./Search.scss";
import Header from "../Header/Header";
import SongRow from "../SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function Search({user}) {
    const [playlist, setPlaylist] = useState(); 
    const [devices, setDevices] = useState(); 
    
    useEffect(() => {
        const _devices = spotify.getMyDevices(user)
        setDevices(_devices)
        
      }, []);

    const playPlaylist = (id) => {
        
        spotify
          .play({
            context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
          })
          .then((res) => {
            spotify.getMyDevices(user)
            spotify.getMyCurrentPlayingTrack().then((r) => {
                setPlaylist(r)
            });
          });
      };

      
    
      const playSong = (id) => {
       
        spotify
          .play({
            uris: [`spotify:track:${id}`],
          })
          .then((res) => {
            spotify.getMyDevices(user)
            spotify.getMyCurrentPlayingTrack().then((r) => {
                setPlaylist(r)
            });
          });
      };

    return (
        <div className="body">
      <Header/>

      <div className="body__info">
        <img src={playlist?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{playlist?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {playlist?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
    )
}

export default Search
