import {SESSION_LOGIN_FAILED, SESSION_LOGIN_REQUEST ,SESSION_LOGIN_SUCCESS, SESSION_LOGOUT,
  SESSION_USER_INFO_REQUEST, SESSION_USER_INFO_REQUEST_SUCCESS, SESSION_USER_INFO_REQUEST_FAILED,
  SESSION_SIGNUP_FAILED, SESSION_SIGNUP_REQUEST, SESSION_SIGNUP_SUCCESS
} from '../actions/sessionActions';

const initialState = {
  loggedIn: false,
  authenticToken: "",
  user: {
    userID: "",
    realName: '',
    userName: "",
    institutionCode: '1',
    role: '' // ['USER']
  },
  // To be Done
  detailedUserInfo: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_LOGOUT: {
      return initialState;
    }

    case SESSION_LOGIN_REQUEST: {
      return state;
    }

    case SESSION_LOGIN_SUCCESS: {
      let token = action.content.tokenType+' '+action.content.accessToken;
      return {...state, loggedIn: true, authenticToken: token}
    }

    case SESSION_LOGIN_FAILED: {
      return state;
    }

    case SESSION_SIGNUP_REQUEST: {
      return state;
    }

    case SESSION_SIGNUP_SUCCESS: {
      return state;
    }

    case SESSION_SIGNUP_FAILED: {
      return state;
    }

    case SESSION_USER_INFO_REQUEST: {
      return state;
    }

    case SESSION_USER_INFO_REQUEST_SUCCESS: {
      return {...state,
        user: {...state.user, userName: action.content.userName,
          realName: action.content.realName, role: action.content.role,
          userID: action.content.id
        }};
    }

    case SESSION_USER_INFO_REQUEST_FAILED: {
      return {loggedIn: false, authenticToken: '', user: {...state.user, realName: '', userName: "", role: ''}};
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
