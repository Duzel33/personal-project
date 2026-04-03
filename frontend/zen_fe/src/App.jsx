import { useState } from 'react'
import zen_wm from './assets/zen_wm3.png'
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
  }
  
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={zen_wm} className="zen" alt="ZEN logo" />
        </div>

        {!user ? (
          <div>
            {view === "login" ? (
              <LoginForm onSwitchToRegister = {() => setView("register")}
               onAuthSuccess = {handleAuthSuccess} />
            ) : (
              <RegisterForm onSwitchToLogin = {() => setView("login")}
               onAuthSuccess = {handleAuthSuccess} />
            )}
            <DailyJoke />
          </div>
        ) : (
        <div>
          <Weather />
          <h3>Welcome, {user.first_name}! Thank you for trusting us with your home care needs. Please Choose what service you would like to schedule.</h3>
          <JobForm onLogout = {handleLogout} onNewRequest={handleNewRequest} />
          <UserRequests refreshTrigger={refreshTrigger} />
          <DailyJoke />
        </div>
        )}
      </section>
    </>
  )
}

export default App
