import React, { useState } from "react"
import JobSpecifics from "./SpecComments"
import TaskSelection from "./TaskSelect"

function JobForm() {
  const [selectedTask, setSelectedTask] = useState("")
  const [comment, setComment] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e) => {e.preventDefault()

    if (!selectedTask) {
        setStatusMessage("Please select a service.")
        return
    }

    if (!comment.trim()) {
        setStatusMessage("Please enter specific task details.")
        return
    }

    try {
        const response = await fetch(
            `http://localhost:8000/categories/${selectedTask}/tasks/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: comment,
                    tasks_author: "TEST USER"
                })
            }
        )

        if (response.ok) {
            setStatusMessage("Service request successfully submitted!")
            setComment("")
            setSelectedTask("")
        } else {
            const errorData = await response.json()
            setStatusMessage("Error: " + JSON.stringify(errorData))
        }
    } catch (err){
        setStatusMessage("Network error: " + err.message)
    }
    
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

      <button className="counter" type="submit">Submit</button>
      <button className="counter" type="button" onClick={() => { setComment(""), setSelectedTask("") }}>Cancel</button>

      {statusMessage && <p>{statusMessage}</p>}
    </form>
  )
}

export default JobForm;