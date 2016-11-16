function page(state = { title: 'OkayMom', sidebarActive: false }, action) {
  switch (action.type) {
    case 'CHANGE_PAGE_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarActive: !state.sidebarActive,
      };
    default:
      return state;
  }
}

export default page;
