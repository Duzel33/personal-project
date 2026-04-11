import { useState } from "react"
import JobSpecifics from "./SpecComments"
import TaskSelection from "./TaskSelect"

const API_URL = "http://localhost:8000"

function JobForm({ onLogout, onNewRequest, onCancel }) {
  const [selectedTask, setSelectedTask] = useState("")
  const [comment, setComment] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedTask) {
      setStatusMessage("Please select a service.")
      return
    }

    if (!comment.trim()) {
      setStatusMessage("Please enter specific task details.")
      return
    }

    setIsLoading(true)
    setStatusMessage("")


    try {
      const token = localStorage.getItem("access")
      const response = await fetch(
        `${API_URL}/services/${selectedTask}/tasks/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
          body: JSON.stringify({
            text: comment,
            service: selectedTask
          })
        }
      )

      if (response.ok) {
        setStatusMessage("Service request successfully submitted!")
        setComment("")
        setSelectedTask("")
        onNewRequest()
      } else {
        const errorData = await response.json()
        setStatusMessage("Error: " + JSON.stringify(errorData))
      }
    } catch (err) {
      setStatusMessage("Network error: " + err.message)
    } finally {
      setIsLoading(false)
    }

  }

  const handleCancel = () => {
    setComment("")
    setSelectedTask("")
    setStatusMessage("")
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Service</h2>

      <TaskSelection
        selectedTask={selectedTask}
        onTaskChange={setSelectedTask}
      />

      <JobSpecifics
        comment={comment}
        onCommentChange={setComment}
      />

      <button className="button" type="submit">Submit</button>
      <button className="button" type="button" onClick={handleCancel} disabled={isLoading}>Cancel</button>
      <button className="button" type="button" onClick={onLogout}>Logout</button>

      {statusMessage && <p className={`status-message`}>{statusMessage}</p>}
    </form>
  )
}

export default JobForm;