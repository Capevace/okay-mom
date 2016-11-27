export const baseFamily = {
  key: '',
  name: '',
  members: '',
  owner: '',
};

export function sanitizeFamily(family) {
  return {
    ...baseFamily,
    ...family,
  };
}
