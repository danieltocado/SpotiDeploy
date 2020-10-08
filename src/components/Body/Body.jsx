import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './Body.scss'
import SongRow from '../SongRow/SongRow';
import { getToken } from '../../config/spotify';
import Axios from 'axios';
import PlaylistInfo from '../PlaylistInfo/Playlistinfo';
import SpotifyWebApi from "spotify-web-api-js";


const spotify = new SpotifyWebApi();

const Body = () => {
    
    const [categoryMood, setCategoryMood] = useState() 
    const [categoryRock, setCategoryRock] = useState() 
    const [categoryParty, setCategoryParty] = useState() 
    const [categoryFocus, setCategoryFocus] = useState()
    const [categoryReleases, setCategoryReleases] = useState()  

    const token = spotify.getAccessToken()

    useEffect(()=> {

    spotify.getCategoryPlaylists('mood').then((response) => {
        setCategoryMood(response)
        console.log("MOOD ---- ",response)
      });

        Axios.get(`https://api.spotify.com/v1/browse/categories?offset=40&limit=20`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((res) => {
          const categorias = res.data;
          console.log("Categorías!!!!!! :smile: ",categorias)
        });
        
    spotify.getCategoryPlaylists('rock').then((response) => {
        setCategoryRock(response)
        console.log("ROCK ---- ",response)
        });

    spotify.getCategoryPlaylists('party').then((response) => {
        setCategoryParty(response)
        console.log("PARTY ---- ",response)
        });

    spotify.getCategoryPlaylists('focus').then((response) => {
        setCategoryFocus(response)
        console.log("FOCUS ---- ",response)
        });

    spotify.getCategory('new-releases').then((response) => {
        setCategoryReleases(response)
        console.log("Releases ---- ",response)
        });

      },[token])

    return (
        <div className="body">
            <Header/>

        {/* ESTADO DE ÁNIMO */}
        <div className="category_info"> 
            <h2>Estado de ánimo</h2>
        </div>
        <div className="body_playlist">
        
        {categoryMood?.playlists.items.map(item => (
                <Link to={"/playlist/" + item.id}><PlaylistInfo key={item.id} image={item.images[0].url} name={item.name} description={item.description}/></Link>
            )) 
        }
        </div>

        {/* ROCK */}
        <div className="category_info">
            <h2>Rock</h2>
        </div>
        <div className="body_playlist">
        
        {categoryRock?.playlists.items.map(item => (
                <Link to={"/playlist/" + item.id}><PlaylistInfo key={item.id} image={item.images[0].url} name={item.name} description={item.description}/></Link>
            )) 
        }
        </div>

        {/* PARTY */}
        <div className="category_info">
            <h2>Party</h2>
        </div>
        <div className="body_playlist">
        
        {categoryParty?.playlists.items.map(item => (
                <Link to={"/playlist/" + item.id}><PlaylistInfo key={item.id} image={item.images[0].url} name={item.name} description={item.description}/></Link>
            )) 
        }
        </div>

        {/* CONCENTRACIÓN */}
        <div className="category_info">
            <h2>Concentración</h2>

        </div>
        <div className="body_playlist">
        
        {categoryFocus?.playlists.items.map(item => (
                <Link to={"/playlist/" + item.id}><PlaylistInfo key={item.id} image={item.images[0].url} name={item.name} description={item.description}/></Link>
            )) 
        }
        </div>

        {/* NOVEDADES POPULARES */}
        <div className="category_info">
            <h2>Novedades populares</h2>
        </div>
        <div className="body_playlist">
        
        {categoryReleases?.playlists.items.map(item => (
                <Link to={"/playlist/" + item.id}><PlaylistInfo key={item.id} image={item.images[0].url} name={item.name} description={item.description}/></Link>
            )) 
        }
        </div>

           {/* 
           
           <div className="body_info">
                <img src="" alt=""/>
                <div className="body_infotext">
                    <strong>PLAYLIST</strong>
                    <h2>Discover weekly</h2>
                    <p>description</p>
                </div>
            </div>
            <div className="body_songs">
                <div className="body_icons">
                    <PlayCircleFilledIcon className="body_shuffle"/>
                    <FavoriteIcon fontSize="large"/>
                    <MoreHorizIcon/>
                </div>
                 List of songs 
                {discover_weekly?.tracks.items.map(item => (
                    <SongRow track={item.track}/> 
                ))}}
                {genres?.categories.items.map(item => (
                    <li>{item.name} - {item.icons[0].url}</li> 
                ))
                
            </div>*/}
        </div>
    )
}



export default Body