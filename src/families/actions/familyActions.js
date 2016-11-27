import store from '../../store';

export const onFamilyKeysLoaded = familyKeys => store.dispatch({
  type: 'FAMILY_KEYS_LOADED',
  familyKeys,
});

export const onFamilyKeyAdded = familyKey => store.dispatch({
  type: 'FAMILY_KEY_ADDED',
  familyKey,
});

export const onFamilyKeyChanged = familyKey => store.dispatch({
  type: 'FAMILY_KEY_CHANGED',
  familyKey,
});

export const onFamilyKeyRemoved = familyKey => store.dispatch({
  type: 'FAMILY_KEY_REMOVED',
  familyKey,
});

export const onFamilyLoaded = family => store.dispatch({
  type: 'FAMILY_LOADED',
  family,
});

export const onFamilyChanged = family => store.dispatch({
  type: 'FAMILY_CHANGED',
  family,
});
