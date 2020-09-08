const UPDATE_DIALER_NUMBER = "UPDATE_NUMBER";
const INVALIDATE_DIALER_NUMBER = "INVALIDATE_NUMBER";
const VALIDATE_DIALER_NUMBER = "VALIDATE_NUMBER";
const ENABLE_NUMBER_SIDEBAR = "ENABLE_SIDEBAR";
const DISABLE_NUMBER_SIDEBAR = "DISABLE_SIDEBAR";
const SET_DIALER_DESTINATION = "DIALER_DESTINATION";
const AUTO_INVALIDATE_NUMBER = "AUTO_INVALIDATE_NUMBER";

const initialState = {
  isConfirmed: false,
  showSidebar: false,
  invalidateNumber: false,
};

export class Actions {
  static updateNumber = (phoneNumber) => ({
    type: UPDATE_DIALER_NUMBER,
    phoneNumber,
  });

  static setToNumber = (phoneNumber) => ({
    type: SET_DIALER_DESTINATION,
    phoneNumber,
  });

  static invalidateNumber = () => ({ type: INVALIDATE_DIALER_NUMBER });
  static validateNumber = () => ({ type: VALIDATE_DIALER_NUMBER });
  static enableSideBar = () => ({ type: ENABLE_NUMBER_SIDEBAR });
  static disableSideBar = () => ({ type: DISABLE_NUMBER_SIDEBAR });
  static setAutoInvalidate = (invalidate) => ({
    type: AUTO_INVALIDATE_NUMBER,
    invalidate,
  });
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DIALER_NUMBER: {
      return {
        ...state,
        phoneNumber: action.phoneNumber,
        isConfirmed: true,
      };
    }

    case INVALIDATE_DIALER_NUMBER: {
      if (!state.invalidateNumber) {
        return state;
      }

      return {
        ...state,
        isConfirmed: false,
      };
    }

    case VALIDATE_DIALER_NUMBER: {
      return {
        ...state,
        isConfirmed: true,
      };
    }

    case ENABLE_NUMBER_SIDEBAR: {
      return {
        ...state,
        showSidebar: true,
        isConfirmed: true,
      };
    }
    case DISABLE_NUMBER_SIDEBAR: {
      return {
        ...state,
        showSidebar: false,
        isConfirmed: !state.invalidateNumber,
      };
    }

    case SET_DIALER_DESTINATION: {
      return {
        ...state,
        toPhoneNumber: action.phoneNumber,
      };
    }

    case AUTO_INVALIDATE_NUMBER: {
      return {
        ...state,
        invalidateNumber: action.invalidate,
      };
    }

    default:
      return state;
  }
}
