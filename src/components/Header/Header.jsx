import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Avatar } from '@material-ui/core'
import SpotifyWebApi from "spotify-web-api-js";
import './Header.scss'

const spotify = new SpotifyWebApi();

function Header() {
    

    const [user, setUser] = useState();

    useEffect(() => {
        
        spotify.getMe().then((_user) => {
                setUser(_user)
                console.log("Header user: ", _user)
            });

      }, []);


    return (
        <div className="header">
            <div className="header_left">
                <SearchIcon/>
                <input type="text" placeholder="Search for Artists, Songs, or Playlists"/>
            </div>
            <div className="header_right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
