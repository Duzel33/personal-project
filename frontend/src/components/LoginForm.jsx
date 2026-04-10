import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function LoginForm({ onSwitchToRegister, onAuthSuccess }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setStatusMessage("")

        try {
            const response = await fetch(`${API_URL}/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("access", data.access)
                localStorage.setItem("refresh", data.refresh)
                onAuthSuccess(data.user)
            } else {
                setStatusMessage(data.error || "Login failed. Please try again.")
            }
        } catch (err) {
            setStatusMessage("Network error: " + err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button className="button" type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in......." : "Login"}
                </button>
                <button className="button" type="button" onClick={onSwitchToRegister}>
                    Create an Account
                </button>

                {statusMessage && (
                    <p className="status-message error">{statusMessage}</p>
                )}
            </form>
        </div>
    )
}

export default LoginForm