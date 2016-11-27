import firebase from '../../firebase';
import store from '../../store';

export function logout() {
  firebase
    .auth()
    .signOut();
}

export function login(email, password) {
  const asyncAlert = message => setTimeout(() => {
    window.alert(message);
  }, 1);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password).catch((err) => {
      console.error(err);

      switch (err.code) {
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          asyncAlert('Wrong password or user not found.');
          break;
        case 'auth/user-disabled':
          asyncAlert('User disabled');
          break;
        case 'auth/invalid-email':
          asyncAlert('Invalid Email');
          break;
        default:
          asyncAlert('Unknown error, check console');
          window.console.error(err);
          break;
      }
    });
}

firebase
  .auth()
  .onAuthStateChanged((user) => {
    store.dispatch({ type: 'UPDATE_LOGIN_STATUS', user });
  });
