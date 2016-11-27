const initialState = {
  loggedIn: false,
  user: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_STATUS':
      if (action.user) {
        return {
          ...state,
          loggedIn: true,
          user: action.user,
        };
      }

      return {
        ...state,
        loggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
