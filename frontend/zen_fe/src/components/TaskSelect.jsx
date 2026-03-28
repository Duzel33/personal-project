
function TaskSelection({ selectedTask, onTaskChange }) {
  const categories = [
    { id: 1, title: "Pressure Wash" },
    { id: 2, title: "Lawn Care" },
    { id: 3, title: "Interior Clean" },
  ]; // you can replace this with fetch later

  return (
    <div>
      <label>Select Task:</label>
      <select value={selectedTask} onChange={(e) => onTaskChange(e.target.value)}>
        <option value="">-- Select Service --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskSelection;
