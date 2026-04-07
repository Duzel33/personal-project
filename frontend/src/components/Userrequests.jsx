import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL || 'services/'

function UserRequests({ refreshTrigger }) {
    const [groupedRequests, setGroupedRequests] = useState([])
    const [services, setServices] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editText, setEditText] = useState("")
    const [editServiceId, setEditServiceId] = useState("")

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("access")
            const headers = { "Authorization": `Bearer ${token}`, }

            const serviceResponse = await fetch(`${API_URL}/services/`)
            const services = await serviceResponse.json()
            setServices(services)

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
                    headers: { "Authorization": `Bearer ${token}`, },
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



    const handleEdit = (task) => {
        setEditingTaskId(task.id)
        setEditText(task.text)
        setEditServiceId(task.service)
    }

    const handleCancelEdit = () => {
        setEditingTaskId(null)
        setEditText("")
        setEditServiceId("")
    }

    const handleSaveEdit = async (oldServiceId, taskId) => {
        try {
            const token = localStorage.getItem("access")
            const response = await fetch(`${API_URL}/services/${oldServiceId}/tasks/${taskId}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        text: editText,
                        service: editServiceId,
                    }),
                }
            )

            if (response.ok) {
                setEditingTaskId(null)
                setEditText("")
                setEditServiceId("")
                fetchRequests()
            } else {
                setStatusMessage("Update failed. Please try again in a few minutes.")
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
                        <div key={task.id}>
                            {editingTaskId === task.id ? (
                                <div className="edit-form">
                                    <div>
                                        <label htmlFor="edit-service">Service: </label>
                                        <select id="edit-service" value={editServiceId} onChange={(e) => setEditServiceId(e.target.value)} >
                                            {services.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="edit-text">Details: </label>
                                        <textarea id="edit-text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                    </div>
                                    <div className="request-task-buttons">
                                        <button className="task-edit" onClick={() => handleSaveEdit(service.id, task.id)}>Save</button>
                                        <button className="task-delete" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="request-task-row">
                                    <span>{task.text}</span>
                                    <div className="request-task-buttons">
                                        <button className="task-edit" onClick={() => handleEdit(task)}>Edit</button>
                                        <button className="task-delete" onClick={() => handleDelete(service.id, task.id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}


export default UserRequests