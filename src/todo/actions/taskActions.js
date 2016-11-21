import taskSource from '../taskSource';
import { sanitizeTask } from '../baseTask';
// firebase.database().ref(`posts/${postId}/starCount`);
// starCountRef.on('value', (snapshot) => {
//   updateStarCount(postElement, snapshot.val());
// });

export function onLoadedTasks(tasks = []) {
  return {
    type: 'LOADED_TASKS',
    tasks: tasks.map(task => sanitizeTask(task)),
  };
}

export function onTaskAdded(task) {
  return {
    type: 'ADDED_TASK',
    task: sanitizeTask(task),
  };
}

export function onTaskChanged(task) {
  return {
    type: 'CHANGED_TASK',
    task: sanitizeTask(task),
  };
}

export function onTaskRemoved(task) {
  return {
    type: 'REMOVED_TASK',
    task: sanitizeTask(task),
  };
}

export function addTask(task) {
  return () => {
    console.log(task);
    taskSource
      .push(task)
      .catch((err) => {
        console.error('Unhandled error fetching tasks, prick.', err);
      });
  };
}

export function updateTask(task) {
  return () => {
    taskSource
      .update(task)
      .catch((err) => {
        console.error('Unhandled error updating task, prick.', err);
      });
  };
}

export function removeTask(task) {
  return () => {
    taskSource
      .remove(task)
      .catch((err) => {
        console.error('Unhandled error removing task, prick.', err);
      });
  };
}

export function loadTasks() {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (auth.loggedIn) {
      taskSource.subscribe(dispatch, `tasks/${auth.user.uid}`);
    }
  };
}

export function unloadTasks() {
  return () => {
    taskSource.unsubscribe();
  };
}
