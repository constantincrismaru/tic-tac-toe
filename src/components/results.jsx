import React, { useEffect, useState } from 'react'
import { get } from 'idb-keyval'

const Results = () => {
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

    return <div className="results">
        <h2>Results</h2>
        <div className="container">
            <div>Player 1</div>
            <div>Player 2</div>
            <div>Result</div>
            {results.map((result, index) => <React.Fragment key={index}>
                <div>{result.xPlayer}</div>
                <div>{result.oPlayer}</div>
                <div>{result.result}</div>
            </React.Fragment>)}
        </div>
    </div>
}
export default Results