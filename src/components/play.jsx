import React, { useState } from 'react'
import Game from './game'

const Play = () => {
    const [xPlayerName, setXPlayerName] = useState('')
    const [oPlayerName, setOPlayerName] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)

    return <div className="play">
        <h2>Play</h2>
        {(!isPlaying && <div>
            <div>
                <div className="player-info">
                    <label>Player 1: </label>
                    <input disabled={isPlaying} type="text" onChange={e => setXPlayerName(e.target.value)} />
                </div>
                <div className="player-info">
                    <label>Player 2: </label>
                    <input disabled={isPlaying} type="text" onChange={e => setOPlayerName(e.target.value)} />
                </div>
            </div>

            <button disabled={!xPlayerName || !oPlayerName} onClick={() => setIsPlaying(true)}>Play</button>
        </div>) ||
            <div>
                <Game xPlayerName={xPlayerName} oPlayerName={oPlayerName}></Game>
            </div>}
    </div>
}
export default Play