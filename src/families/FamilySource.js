import firebase from '../firebase';
import { onFamilyLoaded, onFamilyChanged } from './actions/familyActions';

const firebaseDb = firebase.database();

const parseSnapshot = snapshot =>
  snapshot.key
    ? ({ ...snapshot.val(), key: snapshot.key })
    : false;

class FamilySource {
  constructor(familyKey) {
    this.familyKey = familyKey;
    this.ref = firebaseDb.ref(`family/${this.familyKey}`);

    this.ref
      .once('value')
      .then(snapshot => parseSnapshot(snapshot))
      .then(family => onFamilyLoaded(family));

    this.ref
      .on('child_changed', (snapshot) => {
        const family = parseSnapshot(snapshot);
        onFamilyChanged(family);
      });
  }

  unsubscribe() {
    this.ref.unsubscribe();
  }
}

export default FamilySource;
