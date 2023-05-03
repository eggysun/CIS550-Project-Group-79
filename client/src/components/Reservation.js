import React from 'react';

import React from "react";
import { useState } from "react";


const Reservation = () => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  return (
    <form className="add-form">
      <div className="form-control">
        <label>Task</label>
        <input type="text" 
        placeholder="Add Task" 
        value={text} 
        onChange={(e) => setText(e.target.value)}/>
      </div>

      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder="Add Day & Time" 
        value={day} 
        onChange={(e) => setDay(e.target.value)}/>
      </div>

      <div className="form-controlform-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" 
        value={reminder} 
        onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>

      <input type = 'submit' value = 'Save Task' className ='btn btn-clock'></input>
    </form>
  );
};

export default Reservation;