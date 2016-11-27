function taskReducer(state = [], action) {
  switch (action.type) {
    case 'TASKS_LOADED':
      return action.tasks;
    case 'TASK_ADDED':
      return [
        ...state,
        action.task,
      ];

    case 'TASK_CHANGED':
      return state.map(task => (task.key === action.task.key) ? action.task : task);

    case 'TASK_REMOVED':
      return state.filter(task => task.key !== action.task.key);
    default:
      return state;
  }
}

export default taskReducer;
