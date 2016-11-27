import omit from 'lodash.omit';
import FirebaseList from '../../general/FirebaseList2';
import FamilySource from '../FamilySource';
import { onFamilyKeysLoaded, onFamilyKeyAdded, onFamilyKeyRemoved } from '../actions/familyActions';

const initialState = {
  familiesSource: null,
  familyObjects: {},
  loadingInitialFamilies: false,
};

// Returns family object that includes
//    1. Family key
//    2. Family Data Object
//    3. Family Data source
function newFamily(familyKey) {
  return {
    key: familyKey,
    familyData: {},
    familyLoading: true,
    familySource: new FamilySource(familyKey), // new FamilySource
  };
}

function familyReducer(state = initialState, action) {
  switch (action.type) {
    // When login status changes:
    //  Unsubscribe any existing familySources
    //  if user logged in:
    //    Create new family source based on new user
    //
    //  return "empty" state
    case 'UPDATE_LOGIN_STATUS': {
      if (state.familiesSource) {
        state.familiesSource.unsubscribe();
      }

      if (action.user) { // If user is logged in
        const source = new FirebaseList({
          onValuesLoaded: onFamilyKeysLoaded,
          onValueAdded: onFamilyKeyAdded,
          onValueRemoved: onFamilyKeyRemoved,
          parseSnapshot: snapshot => snapshot.val(),

          onValueChanged: (value) => {
            window.alert('There was an unknown error. Please contact developer!');
            window.console.error('Changed family key:', value);
          },
        });

        source.subscribe(`families/${action.user.uid}`);

        return {
          ...state,
          familiesSource: source,
          familyObjects: {},
          loadingInitialFamilies: true,
        };
      }

      return {
        ...state,
        familiesSource: null,
        familyObjects: {},
        loadingInitialFamilies: false,
      };
    }

    // When new family keys (ids) for user loaded
    //  Create new families object with:
    //    Family Objects according to their keys
    case 'FAMILY_KEYS_LOADED': {
      let familyObjects = {}; // eslint-disable-line
      action.familyKeys.forEach((familyKey) => {
        familyObjects[familyKey] = newFamily(familyKey);
      });

      return {
        ...state,
        familyObjects,
        loadingInitialFamilies: false,
      };
    }

    // When new family key was added
    //  add new family object for new key
    case 'FAMILY_KEY_ADDED': {
      return {
        ...state,
        familyObjects: {
          ...state.familyObjects,
          [action.familyKey]: newFamily(action.familyKey),
        },
      };
    }

    // When family key was removed
    //    Remove family key and family object, and unsubscribe from source
    case 'FAMILY_KEY_REMOVED': {
      if (!state.familyObjects[action.familyKey]) { // If state doesnt contain family, skip action
        return state;
      }

      state.familyObjects[action.familyKey].unsubscribe();
      return {
        ...state,
        familyObjects: omit(state.familyObjects, action.familyKey),
      };
    }

    case 'FAMILY_LOADED':
    case 'FAMILY_CHANGED':
      return {
        ...state,
        familyObjects: {
          ...state.familyObjects,
          [action.family.key]: {
            ...state.familyObjects[action.family.key],
            familyData: action.family,
            familyLoading: false,
          },
        },
      };

    default:
      return state;
  }
}

export default familyReducer;
