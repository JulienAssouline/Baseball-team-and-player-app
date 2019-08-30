import React from 'react';
import '../css/player.css'



function PlayerBio(props) {
    const {data} = props

    return (
        <div className = "bio-container">
            <div className = "profile-pic">
                <img className = "player-profile-pic" src = {`https://securea.mlb.com/mlb/images/players/head_shot/${data.id}.jpg`} alt="Italian Trulli"/>
            </div>
            <div className = "player-background">
                <h1>{data.fullName}</h1>
                <div className = "info-box-header">
                    <p>{data.primaryPosition.abbreviation}</p>
                    <span className = "pip">|</span>
                    <p>Age: {data.currentAge}</p>
                    <span className = "pip">|</span>
                    <p>B/T: {data.batSide.code}/{data.pitchHand.code}</p>
                    <span className = "pip">|</span>
                    <p>{data.height} {data.weight}</p>
                </div>
                <p> {data.birthCity}, {data.birthStateProvince} {data.birthCountry} </p>
                <p> Birthdate: {data.birthDate} </p>
                <p> Drafted: {data.draftYear} </p>
                <p> MLB Debut: {data.mlbDebutDate} </p>
            </div>
        </div>
    );
}

export default PlayerBio;
