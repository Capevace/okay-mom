export const baseTask = {
  key: '',
  title: '',
  completed: false,
  owner: '',
  assignedUsers: [],
  completedBy: [],
};

export function sanitizeTask(task) {
  return {
    ...baseTask,
    ...task,
  };
}
