import React, { useState } from 'react';
import './index.css';  // Make sure this file exists

const App = () => {

    const [inputlist, setinput]= useState("");

    const itemEvent =(event)=>{
        setinput(event.target.value);
    }

  return (
    <>
      <h1>TO DO APP</h1>
      <br />
      <input type="text" placeholder="Enter task" onChange={itemEvent} />
      <button>+</button>
      <ol>
        <li>{inputlist}</li>
      </ol>
    </>
  );
};

export default App;
