import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function RegisterForm({ onSwitchToLogin, onAuthSuccess }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })
    const [statusMessage, setStatusMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setStatusMessage("")

        try {
            const response = await fetch(`${API_URL}/auth/register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("access", data.access)
                localStorage.setItem("refresh", data.refresh)
                onAuthSuccess(data.user)
            } else {
                setStatusMessage("Registration failed: " + JSON.stringify(data))
            }
        } catch (err) {
            setStatusMessage("Network error: " + err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2>Create your Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name: </label>
                    <input id="first_name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name: </label>
                    <input id="last_name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="address">Address: </label>
                    <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} required />
                </div>

                <button className="button" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                {statusMessage && (
                    <p className="status-message error">{statusMessage}</p>
                )}

                <p> Already have an account?{""}
                    <button className="button" type="button" onClick={onSwitchToLogin}>
                        Login
                    </button>
                </p>
            </form>
        </div>
    )
}

export default RegisterForm