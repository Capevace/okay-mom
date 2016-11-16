function tasks(state = [], action) {
  switch (action.type) {
    case 'LOADED_TASKS':
      return action.tasks;
    case 'ADDED_TASK':
      return [
        ...state,
        action.task,
      ];

    case 'CHANGED_TASK':
      return state.map(task => (task.key === action.task.key) ? action.task : task);

    case 'REMOVED_TASK':
      return state.filter(task => task.key !== action.task.key);
    default:
      return state;
  }
}

export default tasks;
