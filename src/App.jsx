import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [inputList, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [lastUpdated, setLastUpdated] = useState("Never");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateItems = (newItems) => {
    setItems(newItems);
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const itemEvent = (event) => {
    setInput(event.target.value);
  };

  const add = () => {
    if (inputList.trim() !== "") {
      const newItem = {
        text: inputList,
        completed: false,
        isEditing: false,
      }
      
      updateItems([...items, newItem]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    updateItems(newItems);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const toggleEditing = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = !newItems[index].isEditing;
    updateItems(newItems);
  };

  const handleEditChange = (index, value) => {
    const newItems = [...items];
    newItems[index].text = value;
    setItems(newItems); 
  };

  const saveEdit = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = false;
    updateItems(newItems);
  };

  return (
    <>
      
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        TO DO APP
      </h1>

      <div className="container">
        {/* Current time */}
        <div className ="time-display" style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>
           {currentTime}
        </div>

        {/* Last updated */}
        <div style={{ fontSize: "14px", color: "#777", marginBottom: "20px" }}>
          Last updated: {lastUpdated}
        </div>

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

      <footer className="footer">Made by Rabia Khan</footer>
    </>
  );
};

export default App;
