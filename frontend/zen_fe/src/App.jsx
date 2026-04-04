import { useState } from 'react'
import JobForm from './components/JobForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserRequests from './components/Userrequests'
import Weather from './components/Weather'
import DailyJoke from './components/Joke'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState("login")
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleAuthSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setUser(null)
    setView("login")
  }

  const handleNewRequest = () => {
    setRefreshTrigger(prev => prev + 1)
    setShowForm(false)
  }

  const handleCancelForm = () => {
    setShowForm(false)
  }

  return (
    <>

      <section id="center">

        {!user ? (
          <div>
            {view === "login" ? (
              <LoginForm onSwitchToRegister={() => setView("register")}
                onAuthSuccess={handleAuthSuccess} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setView("login")}
                onAuthSuccess={handleAuthSuccess} />
            )}
            <DailyJoke />
          </div>
        ) : (
          <div>
            <Weather />
            <h3>Welcome, {user.first_name}! Thank you for trusting us with your home care needs.</h3>
            {showForm ? (
              <JobForm onLogout={handleLogout} onNewRequest={handleNewRequest} onCancel={handleCancelForm} />
            ) : (
              <div>
                <button className="button" onClick={() => setShowForm(true)}>Request a Service</button>
                <button className="button" type="button" onClick={handleLogout}>Logout</button>
              </div>
            )}

            <UserRequests refreshTrigger={refreshTrigger} />
            <DailyJoke />
          </div>
        )}
      </section>
    </>
  )
}

export default App
