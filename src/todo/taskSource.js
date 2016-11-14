import firebase from '../firebase';
import * as taskActions from './actions/taskActions';

const firebaseDb = firebase.database();

let path = '';
let isSubscribed = false;
let dispatch = null;
let unsubscribeRef = () => {
  console.log('Wanted to unsubscribe from ref, when no ref was found.');
};

const snapShotToTask = (snapshot) => {
  console.error('unwrap snapshot bitch', snapshot);
  return {};
};

export const unsubscribe = () => {
  unsubscribeRef();
};

export const subscribe = (passedDispatch, passedPath) => {
  if (isSubscribed) {
    unsubscribe();
  }

  const ref = firebaseDb.ref(path);
  dispatch = passedDispatch;
  path = passedPath;

  let initialized = false;
  let tasks = []; // eslint-disable-line prefer-const

  ref.once('value', () => {
    initialized = true;
    dispatch(taskActions.onLoadedTasks(tasks));
  });

  ref.on('child_added', (snapshot) => {
    const task = snapShotToTask(snapshot);

    if (initialized) {
      dispatch(taskActions.onAddedTask(task));
    } else {
      tasks.push(task);
    }
  });

  ref.on('child_changed', (snapshot) => {
    const task = snapShotToTask(snapshot);
    dispatch(taskActions.onChangedTodoEntry(task));
  });

  ref.on('child_removed', (snapshot) => {
    const task = snapShotToTask(snapshot);
    dispatch(taskActions.onRemovedTodoEntry(task));
  });

  isSubscribed = true;
  unsubscribeRef = () => ref.off();
};

export const push = task =>
   new Promise((resolve, reject) => {
     firebaseDb.ref(path)
      .push(task, error => error ? reject(error) : resolve());
   })
;
