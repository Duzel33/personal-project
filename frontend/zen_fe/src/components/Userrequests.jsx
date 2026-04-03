import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function UserRequests({ refreshTrigger }) {
    const [groupedRequests, setGroupedRequests] = useState([])
    const [statusMessage, setStatusMessage] = useState("")

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("access")
            const headers = {
                "Authorization": `Bearer ${token}`,
            }

            const serviceResponse = await fetch(`${API_URL}/services/`)
            const services = await serviceResponse.json()

            const results = await Promise.all(
                services.map(async (service) => {
                    const tasksResponse = await fetch(
                        `${API_URL}/services/${service.id}/tasks/`,
                        { headers }
                    )
                    const tasks = await tasksResponse.json()
                    return { ...service, userTasks: tasks }
                })
            )

            const filtered = results.filter(service => service.userTasks.length > 0)
            setGroupedRequests(filtered)
        } catch (err) {
            setStatusMessage("Request has failed to load.")
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [refreshTrigger])

    const handleDelete = async (serviceId, taskId) => {
        try {
            const token = localStorage.getItem("access")
            const response = await fetch(
                `${API_URL}/services/${serviceId}/tasks/${taskId}/`,
                {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}`,},
                }
            )

            if (response.ok) {
                fetchRequests()
            } else {
                setStatusMessage("Request to delete has failed. Please try again.")
            }
        } catch (err) {
            setStatusMessage("Network error: " + err.message)
        }
    }

    if (groupedRequests.length === 0) {
        return <p>You have not made any service requests yet.</p>
    }

    return (
        <div className="requests-container">
            <h2>Your service requests</h2>

            {statusMessage && <p className="status-message error">{statusMessage}</p>}

            {groupedRequests.map((service) => (
                <div key={service.id} className="request-service-group">
                    <h3 className="request-service-title">{service.title}</h3>
                    {service.userTasks.map((task) => (
                        <div key={task.id} className="request-task-row"> 
                        <span>{task.text}</span>
                        <button className="task-delete" onClick={() => handleDelete(service.id, task.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default UserRequests