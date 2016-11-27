import { PropTypes } from 'react';

export const baseTask = {
  key: '',
  title: '',
  owner: '',
  assignedUsers: [],
  completedBy: [],
};

export const baseTaskPropTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  assignedUsers: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
  })),
  completedBy: PropTypes.arrayOf(PropTypes.string),
};

export function sanitizeTask(task) {
  return {
    ...baseTask,
    ...task,
  };
}
