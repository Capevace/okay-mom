function tasks(state = [{ title: 'Test', completed: false }], action) {
  switch (action.type) {
    case 'LOADED_TASKS':
      return action.tasks;
    default:
      return state;
  }
}

export default tasks;
