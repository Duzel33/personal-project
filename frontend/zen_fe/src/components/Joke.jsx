import { useState, useEffect } from "react"
// import "../joke.css"

function DailyJoke() {
    const [joke, setJoke] = useState(null)
    const [error, setError] = useState("")

    const fetchJoke = async () => {
        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
            const data = await response.json()

            if (response.ok) {
                setJoke(data)
            } else {
                setError("Joke Failed to Load")
            }
        } catch (err) {
            setError("Joke could not load")
        }
    }

    useEffect(() => {
        fetchJoke()
    }, [])

    if(error) {
        return <p className="status-message error">{error}</p>
    }

    if (!joke) {
        return <p>LOADING JOKE.....</p>
    }

    return (
        <div className="joke-container">
            <h3 className="joke-title">JOKE OF THE DAY</h3>

            {joke.type ==="single" ? (
                <p className="joke-text">{joke.joke}</p>
            ) : (
                <>
                    <p className="joke-text">{joke.setup}</p>
                    <p className="joke-punchline">{joke.delivery}</p>
                </>
            )}

            {/* <button className="button" onClick={fetchJoke}>Click to See Another Joke</button> */}
        </div>
    )
}

export default DailyJoke