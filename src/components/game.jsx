import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Board from './board'
import { set, get } from 'idb-keyval'

// list of postion that is winning
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const isWon = board => {
    return winningPositions.some(position => {
        let [a, b, c] = position

        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return true
        }

        return false
    })
}

const Game = ({ xPlayerName, oPlayerName }) => {
    const [board, setBoard] = useState(Array(9).fill(""))
    const [message, setMessage] = useState(`Player ${xPlayerName} turn:`)
    const [isXPlayerTurn, setIsXPlayerTurn] = useState(true)
    const history = useHistory()
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchResults = async () => {
            const data = await get('results')

            if (data) {
                setResults(data)
            }
        }

        fetchResults()
    }, [])

    const refresh = () => {
        setBoard(Array(9).fill(""))
        setIsXPlayerTurn(true)
        setMessage(`Player ${xPlayerName} turn:`)
    }

    const saveResult = result => {
        results.push({
            xPlayer: xPlayerName,
            oPlayer: oPlayerName,
            result
        })

        setResults(results)
        set("results", results)
    }

    const handleInput = pos => {
        // skip if already checked
        if (isXPlayerTurn === null || board[pos] !== "") {
            return
        }

        const boardCopy = [...board]
        boardCopy[pos] = (isXPlayerTurn && "X") || "O"
        setBoard(boardCopy)


        if (isWon(boardCopy)) {
            // game is over
            const playerWon = (isXPlayerTurn && xPlayerName) || oPlayerName
            setMessage(`Player ${playerWon} won!`)
            setIsXPlayerTurn(null)

            saveResult(playerWon)
            return
        }

        if (boardCopy.indexOf("") === -1) {
            // if no more moves game is draw
            setMessage(`Draw!`)
            setIsXPlayerTurn(null)
            saveResult("Draw")
        } else {
            setMessage(`Player ${(!isXPlayerTurn && xPlayerName) || oPlayerName} turn:`)
            setIsXPlayerTurn(!isXPlayerTurn)
        }
    }

    return <div>
        <div>{message}</div>
        <Board onClick={handleInput} value={board} />
        {isXPlayerTurn === null && <div>
            <button onClick={() => history.push("/results")}>Results</button>
            <button onClick={refresh}>Restart</button>
        </div>}
    </div>
}

export default Game