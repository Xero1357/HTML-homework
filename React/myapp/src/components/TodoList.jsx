// // src/components/TodoList.jsx

// import React, { useState } from 'react';

// const TodoList = () => {
//   // State to hold the task name, task description, and the list of tasks
//   const [taskName, setTaskName] = useState('');
//   const [taskDesc, setTaskDesc] = useState('');
//   const [tasks, setTasks] = useState([]);
  
//   // Function to handle adding a new task
//   const addTask = () => {
//     if (taskName.trim() !== '') {
//       const newTask = { name: taskName, description: taskDesc, done: false };
//       setTasks([...tasks, newTask]);
//       setTaskName('');
//       setTaskDesc('');
//     }
//   };

//   // Function to mark task as done (and effectively remove it from the list)
//   const toggleTask = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   return (
//     <div>
//       <p>New Task:</p>
//       <input 
//         placeholder="Task name" 
//         type="text" 
//         value={taskName}
//         onChange={(e) => setTaskName(e.target.value)}
//       />
//       <input 
//         placeholder="Describe it" 
//         type="text" 
//         value={taskDesc}
//         onChange={(e) => setTaskDesc(e.target.value)}
//       />
//       <button onClick={addTask}>Add</button>

//       <div>
//         <p>My to-do list:</p>
//         <ul>
//           {tasks.map((task, index) => (
//             <li key={index}>
//               <span>{task.name}</span> 
//               <a href="#" onClick={(e) => { e.preventDefault(); toggleTask(index); }}>Done</a>
//             </li>
//           ))}
//         </ul> 
//       </div>
//     </div>
//   );
// };

// export default TodoList;

// src/components/TodoList.jsx

// coded as class function hooks 
// import React, { useState } from 'react';

// const TodoList = () => {
//   const [taskName, setTaskName] = useState('');
//   const [taskDesc, setTaskDesc] = useState('');
//   const [tasks, setTasks] = useState([]);
  
//   const addTask = () => {
//     if (taskName.trim() !== '') {
//       const newTask = { name: taskName, description: taskDesc, done: false };
//       setTasks([...tasks, newTask]);
//       setTaskName('');
//       setTaskDesc('');
//     }
//   };

//   const toggleTask = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   return (
//     <div>
//       <p>New Task:</p>
//       <input 
//         placeholder="Task name" 
//         type="text" 
//         value={taskName}
//         onChange={(e) => setTaskName(e.target.value)}
//       />
//       <input 
//         placeholder="Describe it" 
//         type="text" 
//         value={taskDesc}
//         onChange={(e) => setTaskDesc(e.target.value)}
//       />
//       <button onClick={addTask}>Add</button>

//       <div>
//         <p>My to-do list:</p>
//         <ul>
//           {tasks.map((task, index) => (
//             <li key={index}>
//               <span>{task.name}: {task.description}</span> 
//               <a href="#" onClick={(e) => { e.preventDefault(); toggleTask(index); }}> Done</a>
//             </li>
//           ))}
//         </ul> 
//       </div>
//     </div>
//   );
// };

// export default TodoList;


import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskDesc: '',
      tasks: []
    };
  }

  handleNameChange = (e) => {
    this.setState({ taskName: e.target.value });
  };

  handleDescChange = (e) => {
    this.setState({ taskDesc: e.target.value });
  };

  addTask = () => {
    const { taskName, taskDesc, tasks } = this.state;
    if (taskName.trim() !== '') {
      const newTask = { name: taskName, description: taskDesc, done: false };
      this.setState({
        tasks: [...tasks, newTask],
        taskName: '',
        taskDesc: ''
      });
    }
  };

  toggleTask = (index) => {
    const updatedTasks = this.state.tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { taskName, taskDesc, tasks } = this.state;

    return (
      <div>
        <p>New Task:</p>
        <div className="input-container">
  <input 
    placeholder="Task name"
    type="text"
    value={taskName}
    onChange={this.handleNameChange}
  />
  <input 
    placeholder="Describe it"
    type="text"
    value={taskDesc}
    onChange={this.handleDescChange}
  />
</div>
        <button onClick={this.addTask}>Add</button>

        <div>
          <p>My to-do list:</p>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <span>{task.name}: {task.description}</span> 
                <a href="#" onClick={(e) => { e.preventDefault(); this.toggleTask(index); }}>Done</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
