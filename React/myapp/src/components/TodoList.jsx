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
