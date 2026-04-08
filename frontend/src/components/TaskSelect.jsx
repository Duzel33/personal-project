import { useState, useEffect } from "react"

const API_URL = '/api/'

function TaskSelection({ selectedTask, onTaskChange }) {
  const [services, setServices] = useState([])
  const [loadError, setLoadError] = useState("")




  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services/`)
        if (!response.ok) throw new Error("Failed to load services.")
        const data = await response.json()
        setServices(data)
      } catch (err) {
        setLoadError("Could not load services. Please try again later.")
      }
    }
    fetchServices()
  }, [])

  return (
    <div>
      <label>Select Task:</label>
      <select value={selectedTask} onChange={(e) => onTaskChange(Number(e.target.value))}>
        <option value="">-- Select Service --</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.title}
          </option>
        ))}
      </select>
      {loadError && (<p className="status-message error">{loadError}</p>)}
    </div>
  )
}

export default TaskSelection;
