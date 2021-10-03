export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, username },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        username,
      };

    default:
      return state;
  }
};
