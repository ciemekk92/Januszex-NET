import { Action, Reducer } from 'redux';
import { ActionTypes } from './constants';
import { isDefined } from 'Utils/isDefined';
import { Api } from 'Utils/Api';
import { IUser } from 'Types/stores';
import { AppThunkAction } from './store';

export interface UserState {
  isLoading: boolean;
  users: IUser[];
  currentUser: {
    user: IUser;
    roles: string[];
  };
}

interface SetUsersAction {
  type: typeof ActionTypes.SET_USERS;
  users: IUser[];
}

interface SetUserAction {
  type: typeof ActionTypes.SET_USER;
  currentUser: {
    user: IUser;
    roles: string[];
  };
}

interface SetUserLoadingAction {
  type: typeof ActionTypes.SET_USER_LOADING;
  isLoading: boolean;
}

export type UserActionTypes =
  | SetUsersAction
  | SetUserAction
  | SetUserLoadingAction;

export const actionCreators = {
  getUsers:
    (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_USER_LOADING,
        isLoading: true
      });

      if (appState && appState.user) {
        const result = await Api.get('api/User');

        if (result) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_USERS,
            users: json
          });
        }
      }
    },
  getCurrentUser:
    (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_USER_LOADING,
        isLoading: true
      });

      if (appState && appState.user) {
        const result = await Api.get('api/User/me');

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_USER,
            currentUser: json
          });
        }
      }
    }
};

const initialState: UserState = {
  isLoading: false,
  users: [],
  currentUser: {
    user: {
      id: '',
      userName: '',
      email: '',
      darkMode: false
    },
    roles: []
  }
};

export const reducer: Reducer<UserState> = (
  state: UserState | undefined,
  incomingAction: Action
): UserState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as UserActionTypes;

  switch (action.type) {
    case ActionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
        isLoading: false
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoading: false
      };
    case ActionTypes.SET_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
  }

  return state;
};
