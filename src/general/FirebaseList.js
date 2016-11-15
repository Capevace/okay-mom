import firebase from '../firebase';

const firebaseDb = firebase.database();

const parseSnapshot = snapshot =>
  snapshot.key
    ? ({ ...snapshot.val(), key: snapshot.key })
    : false;

class FirebaseList {
  constructor(actions) {
    this.actions = actions;
    this.isSubscribed = false;
    this.unsubscribeRef = () => {};
    this.basePath = null;
  }

  subscribe(dispatch, basePath) {
    if (this.isSubscribed) {
      this.unsubscribe();
    }

    this.basePath = basePath;

    const ref = firebaseDb.ref(this.basePath);
    let initialized = false;
    let children = []; // eslint-disable-line prefer-const

    ref.once('value', () => {
      initialized = true;
      dispatch(this.actions.onValuesLoaded(children));
    });

    ref.on('child_added', (snapshot) => {
      const child = parseSnapshot(snapshot);

      if (!child) return;

      if (initialized) {
        dispatch(this.actions.onValueAdded(child));
      } else {
        children.push(child);
      }
    });

    ref.on('child_changed', (snapshot) => {
      const child = parseSnapshot(snapshot);

      if (!child) return;

      dispatch(this.actions.onValueChanged(child));
    });

    ref.on('child_removed', (snapshot) => {
      const child = parseSnapshot(snapshot);

      if (!child) return;

      dispatch(this.actions.onValueRemoved(child));
    });

    this.isSubscribed = true;
    this.unsubscribeRef = () => ref.off();
  }

  unsubscribe() {
    this.unsubscribeRef();
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this.basePath)
       .push(value, error => error ? reject(error) : resolve());
    });
  }

  update(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this.basePath}/${value.key}`)
       .update(value, error => error ? reject(error) : resolve());
    });
  }

  remove(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this.basePath}/${value.key}`)
       .remove(error => error ? reject(error) : resolve());
    });
  }
}

export default FirebaseList;
