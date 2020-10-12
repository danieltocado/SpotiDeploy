import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SidebarOption from '../SidebarOption/SidebarOption'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import "./Sidebar.scss"
import SpotifyWebApi from "spotify-web-api-js";


const spotify = new SpotifyWebApi();

function Sidebar() {
    const [playlists, setPlaylists] = useState(); 

    useEffect(() => {
        
        spotify.getUserPlaylists().then((_playlists) => {
            setPlaylists(_playlists)
            console.log(_playlists)
          });

        return () => {
           
        }
    }, [])

    return (
        <div className="sidebar">
            <img className="sidebar_logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""/>

            <Link to={"/home"}><SidebarOption Icon={HomeIcon} title="Home"/></Link>
            <Link to={"/search"}><SidebarOption Icon={SearchIcon} title="Search"/></Link>
            <SidebarOption Icon={LibraryMusicIcon} title="Your Library"/>

            <br/>
            <strong className="sidebar_title">PLAyYLISTS</strong>
            <hr/>

            {playlists?.items?.map(playlist => (
                <Link to={"/playlist/" + playlist.id}><SidebarOption title={playlist.name}/></Link>
            ))}

        </div>
    )
}

export default Sidebar
