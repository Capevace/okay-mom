import * as taskSource from '../taskSource';

// firebase.database().ref(`posts/${postId}/starCount`);
// starCountRef.on('value', (snapshot) => {
//   updateStarCount(postElement, snapshot.val());
// });

export function onLoadedTasks(tasks) {
  return {
    type: 'LOADED_TASKS',
    tasks,
  };
}

export function onAddedTodoEntry(task) {

}

export function addTask(task) {
  return (dispatch) => {
    taskSource.push(task)
      .then(() => dispatch());
  };
}

export function loadTasks() {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (auth.loggedIn) {
      taskSource.subscribe(dispatch);
    }
  };
}

export function unloadTasks() {
  return () => {
    taskSource.unsubscribe();
  };
}
