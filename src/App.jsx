import React, { useState } from 'react';
import './index.css';  

const App = () => {

    const [inputlist, setinput]= useState("");
    const [items, setitems]=useState([]);

    const itemEvent =(event)=>{
        setinput(event.target.value);
    }

    const add =()=>{
        
    }

  return (
    <>
      <h1>TO DO APP</h1>
      <br />
      <input type="text" placeholder="Enter task" onChange={itemEvent} />
      <button onClick={add}>+</button>
      <ol>
        {/* <li>{inputlist}</li> */}
        items.map((itemval)=>{
            return <li>{itemval</li>;
        }})
      </ol>
    </>
  );
};

export default App;
