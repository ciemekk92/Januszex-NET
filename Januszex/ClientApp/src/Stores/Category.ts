import { Action, Reducer } from 'redux';

import { ICategory } from 'Types/stores';
import { Api } from 'Utils/Api';

import { ActionTypes } from './constants';
import { AppThunkAction } from './store';
import { isDefined } from '../Utils/isDefined';

export interface CategoryState {
  isLoading: boolean;
  categories: ICategory[];
  category: ICategory;
}

interface SetCategoriesAction {
  type: typeof ActionTypes.SET_CATEGORIES;
  categories: ICategory[];
}

interface SetCategoryAction {
  type: typeof ActionTypes.SET_CATEGORY;
  category: ICategory;
}

interface SetLoadingAction {
  type: typeof ActionTypes.SET_LOADING;
  isLoading: boolean;
}

export type CategoryActionTypes =
  | SetCategoriesAction
  | SetCategoryAction
  | SetLoadingAction;

export const actionCreators = {
  getCategories:
    (): AppThunkAction<CategoryActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_LOADING,
        isLoading: true
      });

      if (appState && appState.category) {
        const result = await Api.get(`api/Category`);

        if (result) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_CATEGORIES,
            categories: json
          });

          dispatch({
            type: ActionTypes.SET_LOADING,
            isLoading: false
          });
        }
      }
    },
  getCategory:
    (id: Id): AppThunkAction<CategoryActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_LOADING,
        isLoading: true
      });

      if (appState && appState.category) {
        const result = await Api.get(`api/Category/${id}`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_CATEGORY,
            category: json
          });
        }
      }
    }
};

const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  category: {
    id: '',
    created: '',
    parentId: '',
    name: ''
  }
};

export const reducer: Reducer<CategoryState> = (
  state: CategoryState | undefined,
  incomingAction: Action
): CategoryState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as CategoryActionTypes;

  switch (action.type) {
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        isLoading: false
      };
    case ActionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
        isLoading: false
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
