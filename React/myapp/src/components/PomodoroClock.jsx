import React, { useState, useEffect } from 'react';

const PomodoroClock = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25); 
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let timer;
    
    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0 && (minutes > 0 || hours > 0)) {
          if (minutes === 0) {
            setHours(prev => prev - 1);
            setMinutes(59);
          } else {
            setMinutes(prev => prev - 1);
          }
          setSeconds(59);
        } else if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else {
          setIsActive(false); 
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds, minutes, hours]);

  const handleInputChange = (e, setter) => {
    setter(Math.max(0, parseInt(e.target.value) || 0));
  };

  const adjustTime = (unit, operation) => {
    if (unit === 'hours') {
      setHours(prev => Math.max(0, operation === 'increment' ? prev + 1 : prev - 1));
    } else if (unit === 'minutes') {
      setMinutes(prev => Math.max(0, operation === 'increment' ? prev + 1 : prev - 1));
    } else if (unit === 'seconds') {
      setSeconds(prev => Math.max(0, operation === 'increment' ? prev + 1 : prev - 1));
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <label>
          Hours:
          <input
            type="number"
            value={hours}
            onChange={(e) => handleInputChange(e, setHours)}
            min="0"
          />
          <button onClick={() => adjustTime('hours', 'increment')}>+</button>
          <button onClick={() => adjustTime('hours', 'decrement')}>-</button>
        </label>
      </div>
      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => handleInputChange(e, setMinutes)}
            min="0"
          />
          <button onClick={() => adjustTime('minutes', 'increment')}>+</button>
          <button onClick={() => adjustTime('minutes', 'decrement')}>-</button>
        </label>
      </div>
      <div>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => handleInputChange(e, setSeconds)}
            min="0"
          />
          <button onClick={() => adjustTime('seconds', 'increment')}>+</button>
          <button onClick={() => adjustTime('seconds', 'decrement')}>-</button>
        </label>
      </div>
      <div>
        <h2>
          {String(hours).padStart(2, '0')}:
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </h2>
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroClock;