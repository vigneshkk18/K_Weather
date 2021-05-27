
import Morning from './morning_ui.js';
import Night from './night_ui.js';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  const [ day_night, set_day_night ] = useState(false);

  useEffect(()=>{
    /* setting day or night if its above 6pm its night otherwise its day */
    
    set_day_night(((new Date().getHours() <=18) ? true : false));
    
    var length = document.getElementsByClassName('grid-item-2')[0].getElementsByTagName('p').length;
    
    /* setting style for the value showing part */
    for(var i=0;i<length;i++){
      document.getElementsByClassName('grid-item-2')[0].getElementsByTagName('p')[i].style.color = ( day_night ? '#2F2E41': '#BAC6F2' );
    }

  },[day_night]);

  return (
    <div>
       {
        day_night 
        ?
          <Morning />
        :
          <Night />
       }
    </div>
  );
}

export default App;
