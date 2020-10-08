import React from 'react'
import './PlaylistInfo.scss'

function PlaylistInfo({ image, name, description }) {
    return (
        <div className="playlist_info">
            <img className="playlist_info_image" src={image} alt=""/>
            <h4>{name}</h4>
            <span className="playlist_description">{description}</span>
        </div>
    )
}

export default PlaylistInfo