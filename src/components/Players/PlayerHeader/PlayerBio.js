import React from 'react';

function PlayerBio(props) {
    const {data} = props

    return (
        <div className = "bio-container">
            <div className = "profile-pic">
                <img className = "player-profile-pic" src = {`https://securea.mlb.com/mlb/images/players/head_shot/${data.id}.jpg`} alt={data.fullName}/>
            </div>
            <div className = "player-background">
                <h1>{data.fullName}</h1>
                <div className = "info-box-header">
                    {data.primaryPosition.abbreviation}
                    <span className = "pip">|</span>
                    Age: {data.currentAge}
                    <span className = "pip">|</span>
                    B/T: {data.batSide.code}/{data.pitchHand.code}
                    <span className = "pip">|</span>
                    {data.height} {data.weight}
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
