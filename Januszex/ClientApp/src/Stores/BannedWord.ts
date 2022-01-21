import { Action, Reducer } from 'redux';
import { IBannedWord } from 'Types/stores';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface BannedWordState {
  isLoading: boolean;
  bannedWords: IBannedWord[];
}

interface SetBannedWordsAction {
  type: typeof ActionTypes.SET_BANNED_WORDS;
  bannedWords: IBannedWord[];
}

interface SetBannedWordsLoadingAction {
  type: typeof ActionTypes.SET_BANNED_WORDS_LOADING;
  isLoading: boolean;
}

export type BannedWordActionTypes =
  | SetBannedWordsAction
  | SetBannedWordsLoadingAction;

export const actionCreators = {
  getBannedWords:
    (): AppThunkAction<BannedWordActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_BANNED_WORDS_LOADING,
        isLoading: true
      });

      if (appState && appState.bannedWord) {
        const result = await Api.get('api/BannedWord');

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_BANNED_WORDS,
            bannedWords: json
          });
        }
      }
    }
};

const initialState: BannedWordState = {
  isLoading: false,
  bannedWords: []
};

export const reducer: Reducer<BannedWordState> = (
  state: BannedWordState | undefined,
  incomingAction: Action
): BannedWordState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as BannedWordActionTypes;

  switch (action.type) {
    case ActionTypes.SET_BANNED_WORDS:
      return {
        ...state,
        bannedWords: action.bannedWords,
        isLoading: false
      };
    case ActionTypes.SET_BANNED_WORDS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
  }

  return state;
};
