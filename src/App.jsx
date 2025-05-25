import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [inputList, setInput] = useState("");
  const [items, setItems] = useState([]);

  const itemEvent = (event) => {
    setInput(event.target.value);
  };

  const add = () => {
    if (inputList.trim() !== "") {
      const newItem = {
        text: inputList,
        completed: false,
        isEditing: false,
      };
      setItems([...items, newItem]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const toggleEditing = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = !newItems[index].isEditing;
    setItems(newItems);
  };

  const handleEditChange = (index, value) => {
    const newItems = [...items];
    newItems[index].text = value;
    setItems(newItems);
  };

  const saveEdit = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = false;
    setItems(newItems);
  };

  return (
    <>
      <div className="container">
        <h1>TO DO APP</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter task"
            onChange={itemEvent}
            value={inputList}
          />
          <button onClick={add}>+</button>
        </div>
        <ol>
          {items.map((item, index) => (
            <li key={index} className={item.completed ? "completed" : ""}>
              <span
                className="tick-icon"
                onClick={() => toggleComplete(index)}
                title={item.completed ? "Mark as incomplete" : "Mark as complete"}
                style={{
                  cursor: "pointer",
                  marginRight: "12px",
                  userSelect: "none",
                }}
              >
                {item.completed ? "✔️" : "⭕"}
              </span>

              {item.isEditing ? (
                <>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleEditChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(index);
                    }}
                    autoFocus
                    style={{ flex: 1, marginRight: "10px" }}
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                </>
              ) : (
                <>
                  <span
                    style={{ flex: 1, userSelect: "none" }}
                    onDoubleClick={() => toggleEditing(index)}
                    title="Double click to edit"
                  >
                    {item.text}
                  </span>
                  <button className="edit-btn" onClick={() => toggleEditing(index)}>
                    ✏️
                  </button>
                </>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteItem(index)}
                title="Delete task"
                style={{ marginLeft: "10px" }}
              >
                ✕
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <footer className="footer">Made by Rabia Khan</footer>
    </>
  );
};

export default App;
